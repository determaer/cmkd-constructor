import { defineStore } from 'pinia';
import { nextTick, ref } from 'vue';
import type { Label } from '../types/label.ts';

export const useLabelStore = defineStore('chats', () => {
  const labels = ref<Label[]>([])
  const isLabelsUpdated = ref(false)
  const defaultLabel : Label = {
    id: 0,
    index: 0,
    prop: 0,
    typeText: "u",
    numText: "1",
    type: "circle",
    num: 1,
    score: 1,
    isBase: true,
    connections: [],
    secStart: true,
    secEnd: true,
    fontStyle: "normal",
    arrowOut: false,
    arrowIn: false,
    level: 0,
    isLabel: true,
    secLength: 1,
    lowLevel: [],
    highLevel: [],
    position: 0,
    grey: false,
    sectorName: '',
    drawAnyCase: true,
  }

  function newLabel(){
    isLabelsUpdated.value = false
    console.log('123')
    labels.value.push(
      {
        ...defaultLabel, 
        id: labels.value.length + 1,
        index: labels.value.length + 1,
        position: labels.value.length + 1,
        numText: (labels.value.length + 1).toString(),
      }
    )
    isLabelsUpdated.value = true
  }

  function newCMKD(labelsLength: number){
    if (labelsLength > 0){
      isLabelsUpdated.value = false
      labels.value = []
      for (let i = 0; i < labelsLength; i++){
        labels.value.push(
          {
            ...defaultLabel, 
            id: labels.value.length,
            index: labels.value.length,
            position: labels.value.length + 1,
            numText: (labels.value.length + 1).toString(),
          }
        )
      }
      console.log(labels.value)
      nextTick(() => {
        isLabelsUpdated.value = true
      })
      
    }
  }

  function editLabel(label: Label, labelId: number){
    const index = labels.value.findIndex(l => l.id == labelId)
    labels.value[index] = label
  }

  return {
    labels,
    isLabelsUpdated,
    newLabel,
    newCMKD,
  }
})