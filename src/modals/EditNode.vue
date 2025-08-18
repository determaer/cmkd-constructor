<template>
  <div style="display: flex; flex-direction: column;">
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
    <span>Форма</span>
    <select v-model="objectLabel.type" @change="onChange">
      <option value="rect">Квадрат</option>
      <option value="roundrect">Скруглённый квадрат</option>
      <option value="circle">Круг</option>
    </select>
    <span>Цвет (от красного к зелёному): {{ objectLabel.score }}</span>
    <input
      v-model="objectLabel.score"
      type="range"
      min="-1"
      max="1"
      step="0.1"
      @input="onChange"
    >    
    <div style="display: flex;">
      <span style="width: 50%;">Начало сектора</span>
      <input
        v-model="objectLabel.secStart"
        type="checkbox"
        @input="onChange"
      >   
    </div>
    <div style="display: flex;">
      <span style="width: 50%;">Конец сектора</span>
      <input
        v-model="objectLabel.secEnd"
        type="checkbox"
        @input="onChange"
      >
    </div>
    <div style="display: flex;">
      <span style="width: 50%;">Вход стрелки</span>
      <input
        v-model="objectLabel.arrowIn"
        type="checkbox"
        @input="onChange"
      >   
    </div>
    <div style="display: flex;">
      <span style="width: 50%;">Выход стрелки</span>
      <input
        v-model="objectLabel.arrowOut"
        type="checkbox"
        @input="onChange"
      >  
    </div>
    <div style="display: flex;">
      <span style="width: 50%;">Серый</span>
      <input
        v-model="objectLabel.grey"
        type="checkbox"
        @input="onChange"
      >  
    </div>
      
    <span>Число вариантов</span>
    <input
      v-model="objectLabel.num"
      min="1"
      max="10"
      type="number"
      @input="onChange"
    >    
    <span>Тип начертания</span>
    <select v-model="objectLabel.fontStyle" @change="onChange">
      <option value="normal">Нормальный</option>
      <option value="bold">Полужирный</option>
      <option value="italic">Курсив</option>
    </select>
    <span>Опорные элементы</span>
    <select multiple v-model="objectLabel.connections" @change="onChange">
      <option 
        v-for="label of store.labels" 
        :value="label.id"
      >
        {{ label.typeText + label.numText }}
      </option>
    </select> 
    <span>Выбраны id: {{ objectLabel.connections }}</span>
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { useLabelStore } from '../store/labelStore';

const store = useLabelStore()

const objectLabel = ref({
  typeText: '',
  numText: '',
  type: '',
  score: 0,
  secStart: false,
  secEnd: false,
  arrowIn: false,
  arrowOut: false,
  num: 1,
  fontStyle: '',
  connections: [0],
  grey: false,
})

const emit = defineEmits(['change']);


const onChange = () => {
  console.log('changing result object')
  emit('change', {label: objectLabel});
}

onMounted(() => {
  if (store.selectedLabel != undefined){
    objectLabel.value.typeText  = store.selectedLabel.typeText
    objectLabel.value.numText = store.selectedLabel.numText
    objectLabel.value.type = store.selectedLabel.type
    objectLabel.value.score = store.selectedLabel.score
    objectLabel.value.secStart = store.selectedLabel.secStart
    objectLabel.value.secEnd = store.selectedLabel.secEnd
    objectLabel.value.arrowIn = store.selectedLabel.arrowIn
    objectLabel.value.arrowOut = store.selectedLabel.arrowOut
    objectLabel.value.num = store.selectedLabel.num
    objectLabel.value.fontStyle = store.selectedLabel.fontStyle
    objectLabel.value.connections = store.selectedLabel.connections
    objectLabel.value.grey = store.selectedLabel.grey
  }
  emit('change', {label: objectLabel});
})
</script>

<style scoped></style>
