<template>
  <div class='container'>
    <span>Префикс</span>
    <input
      v-model="objectLabel.typeText"
      type="text"
      @input="onChange"
    >    
    <span>Постфикс</span>
    <input
      v-model="objectLabel.numText"
      type="text"
      @input="onChange"
    >
    <span>Раздел</span>
    <input
      v-model="objectLabel.prop"
      min="1"
      max="10"
      type="number"
      @input="onChange"
    >     
    <div 
      v-if="store.selectedLabel?.level == 0"
      style="display: flex; flex-direction: column;"
    >
      <span>Форма</span>
      <select v-model="objectLabel.type" @change="onChange">
        <option value="rect">Квадрат</option>
        <option value="roundrect">Скруглённый квадрат</option>
        <option value="circle">Круг</option>
      </select>
    </div> 
    
    <div style="display: flex;">
      <span style="width: 30%;">Цвет: {{ objectLabel.score }}</span>
      <span class="preview-color-container">
        <span 
          class='preview-color'
          :style="{
            backgroundColor: resultColorPreview,
            opacity: Math.abs(objectLabel.score)
          }"
        />
      </span>
      
    </div>
    
    <input
      v-model="objectLabel.score"
      type="range"
      min="-1"
      max="1"
      step="0.01"
      @input="onChange"
    >    
    <div 
      v-if="store.selectedLabel?.level == 0"
      style="display: flex;"
    >
      <span style="width: 50%;">Начало сектора</span>
      <input
        v-model="objectLabel.secStart"
        type="checkbox"
        @input="onChange"
      >   
    </div>
    <div 
      v-if="store.selectedLabel?.level == 0"
      style="display: flex;"
    >
      <span style="width: 50%;">Конец сектора</span>
      <input
        v-model="objectLabel.secEnd"
        type="checkbox"
        @input="onChange"
      >
    </div>
    <div
      v-if="store.selectedLabel?.level == 0" 
      style="display: flex;"
    >
      <span style="width: 50%;">Вход стрелки</span>
      <input
        v-model="objectLabel.arrowIn"
        type="checkbox"
        @input="onChange"
      >   
    </div>
    <div
      v-if="store.selectedLabel?.level == 0" 
      style="display: flex;"
    >
      <span style="width: 50%;">Выход стрелки</span>
      <input
        v-model="objectLabel.arrowOut"
        type="checkbox"
        @input="onChange"
      >  
    </div>
    <div
      v-if="store.selectedLabel?.level == 0"  
      style="display: flex;"
    >
      <span style="width: 50%;">Серый</span>
      <input
        v-model="objectLabel.grey"
        type="checkbox"
        @input="onChange"
      >  
    </div>
    <div 
      v-if="store.selectedLabel?.level == 0"
      style="display: flex; flex-direction: column;"
    >
      <span>Число вариантов</span>
      <input
        v-model="objectLabel.num"
        min="1"
        max="10"
        type="number"
        @input="onChange"
      >    
    </div>  
    
    <span>Тип начертания</span>
    <select v-model="objectLabel.fontStyle" @change="onChange">
      <option value="normal">Нормальный</option>
      <option value="bold">Полужирный</option>
      <option value="italic">Курсив</option>
    </select>
    <div 
      v-if="store.selectedLabel?.level == 0"
      style="display: flex; flex-direction: column;"
    >
      <span>Опорные элементы</span>
      <select multiple v-model="objectLabel.connections" @change="onChange">
        <option 
          v-for="label of store.firstLevelLabels" 
          :value="label.id"
        >
          {{ label.typeText + label.numText }}
        </option>
      </select> 
      <span>Выбраны id: {{ objectLabel.connections }}</span>
    </div>

    <div 
      v-if="store.selectedLabel?.level != 0"
      style="display: flex; flex-direction: column;"
    >
      <span>Длина сектора</span>
      <input
        v-model="objectLabel.secLength"
        min="1"
        max="10"
        type="number"
        @input="onChange"
      >    
    </div> 
    <div
      v-if="store.selectedLabel?.level != 0" 
      style="display: flex;"
    >
      <span style="width: 80%;">Представлен фигурой</span>
      <input
        v-model="objectLabel.isLabel"
        type="checkbox"
        @input="onChange"
      >  
    </div>
    <div class="buttons">
      <button @click="emit('submit')">
        OK
      </button>
      <button @click="emit('close')">
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { computed, onMounted, ref } from 'vue';
import { useLabelStore } from '../store/labelStore';
import type { Label } from '../types/label';

const store = useLabelStore()

const objectLabel = ref<Label>({...store.defaultLabel})

const emit = defineEmits(['change', 'submit', 'close']);

const onChange = () => {
  console.log('changing result object')
  emit('change', {label: objectLabel});
}

const resultColorPreview = computed(() => {
  if (objectLabel.value.score){
    if (objectLabel.value.score < 0) return 'red'
    else return 'green'
  }
})

onMounted(() => {
  if (store.selectedLabel != undefined){
    objectLabel.value = {...store.selectedLabel}
  }
  emit('change', {label: objectLabel});
})
</script>

<style scoped>

.container{
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.preview-color-container{
  display: flex;
  width: 15px;
  height: 15px;
  border: 1px solid black;
}

.preview-color{
  width: 100%;
  height: 100%;
}
</style>
