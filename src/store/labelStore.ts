import { defineStore } from 'pinia';
import { nextTick, ref, watch } from 'vue';
import type { Label } from '../types/label.ts';

export const useLabelStore = defineStore('chats', () => {
  const labels = ref<Label[]>([])
  const isLabelsUpdated = ref(false)
  const forceResetSelected = ref(false)
  const selectedLabel = ref<Label>()
  const drawingMode = ref('default')
  const showSupportRect = ref(false)
  const showImportant = ref(false)
  const allowInputPosition = ref(false)
  const position = ref(0)
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
    labels.value.push(
      {
        ...defaultLabel, 
        id: labels.value.length,
        index: labels.value.length,
        position: labels.value.length,
        numText: (labels.value.length + 1).toString(),
      }
    )
    nextTick(() => {
      isLabelsUpdated.value = true
    })
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
      nextTick(() => {
        isLabelsUpdated.value = true
      })
      
    }
  }

  function editLabel(label: Label, labelId: number){
    forceResetSelected.value = true
    nextTick(() => {
      isLabelsUpdated.value = false
      const index = labels.value.findIndex(l => l.id == labelId)
      labels.value[index] = label
      console.log(labels.value[index])
      nextTick(() => {
        isLabelsUpdated.value = true
        forceResetSelected.value = false
      })
    })
    
  }

  function deleteLabel(labelId: number){
    forceResetSelected.value = true
    nextTick(() => {
      isLabelsUpdated.value = false
      const index = labels.value.findIndex(l => l.id == labelId)
      labels.value.splice(index, 1)
      for (let i = 0; i < labels.value.length; i++){
        labels.value[i].id = i
        labels.value[i].index = i
        labels.value[i].position = i + 1
      }
      nextTick(() => {
        isLabelsUpdated.value = true
        forceResetSelected.value = false
      })
    })
    
  }

  watch(
    [() => drawingMode.value, () => showSupportRect.value, () => showImportant.value],
    () => {
      console.log('reload')
      isLabelsUpdated.value = false
      nextTick(() => {
        isLabelsUpdated.value = true
      })
    }
  )

  return {
    labels,
    isLabelsUpdated,
    forceResetSelected,
    selectedLabel,
    drawingMode,
    showSupportRect,
    showImportant,
    allowInputPosition,
    position,
    newLabel,
    newCMKD,
    editLabel,
    deleteLabel,
  }
})