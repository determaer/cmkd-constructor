<script setup lang="ts">
import { useLabelStore } from '../store/labelStore';
import { useModalEditNode } from '../modals/useEditNode';
const store = useLabelStore()

const emit = defineEmits(['unselect', 'download'])

const editNode = async () => {
  const labelId = store.selectedLabel ? store.selectedLabel.id : 0
  const labelData = await useModalEditNode()
  if (labelData.label){
    const label = {...store.selectedLabel, ...labelData.label}
    store.editLabel(label, labelId)
    emit('unselect')
  }
}

</script>

<template>
  <div>
    <button @click="store.newLabel()">
      Добавить узел
    </button>
    <button @click="store.newCMKD(5)">
      Сбросить карту
    </button>
    <button 
      v-if="store.selectedLabel"
      @click="() => {
        const labelId = store.selectedLabel ? store.selectedLabel.id : 0
        emit('unselect')
        store.deleteLabel(labelId)
      }"
    >
      Удалить узел
    </button>
    <button 
      v-if="store.selectedLabel"
      @click="editNode"
    >
      Редактировать узел
    </button>
    <select v-model="store.drawingMode">
      <option value="default">Базовая</option>
      <option value="score">Частная</option>
      <option value="light">Частная упрощённая</option>
    </select>
    
    <button @click="emit('download')">Сохранить карту</button>
  </div>
  <div>
    <span>Включить опцию</span>
    <input 
      v-model="store.allowInputPosition"
      type="checkbox"
    />
    <span>Позиция последнего изученного элемента</span>
    <input
      v-model="store.position"
      :disabled="!store.allowInputPosition"
      type="number"
      min="0"
    />
  </div>
  <div>
    <span>Вынос дополнительного материала</span>
    <input
      v-model="store.showSupportRect"
      type="checkbox"
    />
  </div>
  <div>
    <span>Выделение важных связей</span>
    <input
      v-model="store.showImportant"
      type="checkbox"
    />
  </div>
  
</template>

<style scoped>

</style>
