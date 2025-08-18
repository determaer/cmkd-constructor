<script setup lang="ts">
import { useLabelStore } from '../store/labelStore';
import { useModalEditNode } from '../modals/useEditNode';
const store = useLabelStore()

const emit = defineEmits(['unselect'])

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
  <button @click="store.newLabel()">
    Добавить узел
  </button>
  <button @click="store.newCMKD(10)">
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
</template>

<style scoped>

</style>
