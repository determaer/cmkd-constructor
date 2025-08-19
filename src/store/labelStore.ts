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
  const levelNewLabel = ref(0)

  const firstLevelLabels = ref<Label[]>([])
  const secondLevelLabels = ref<Label[]>([])
  const thirdLevelLabels = ref<Label[]>([])

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
    grey: false,
    sectorName: '',
    drawAnyCase: true,
  }

  function combineCMKD(){
    labels.value = []
    const tempLabels = labels.value.concat(thirdLevelLabels.value, secondLevelLabels.value, firstLevelLabels.value)
    tempLabels.forEach((label, index) => {
      label.index = index
    })
    labels.value = tempLabels
  }

  function newLabel(){
    //Учесть: для сводной карты отсчёт уровней идёт по убыванию - необходимо размещать высокоуровневые узлы в начале labels
    isLabelsUpdated.value = false
    const newLabel = {
      ...defaultLabel, 
      id: labels.value.length,
      index: labels.value.length,
      numText: (labels.value.length + 1).toString(),
      level: levelNewLabel.value
    }
    if (levelNewLabel.value == 0)
      firstLevelLabels.value.push(newLabel)
    if (levelNewLabel.value == 1)
      secondLevelLabels.value.push(newLabel)
    if (levelNewLabel.value == 2)
      thirdLevelLabels.value.push(newLabel)
    combineCMKD()
    nextTick(() => {
      isLabelsUpdated.value = true
    })
  }

  function newCMKD(labelsLength: number){
    if (labelsLength > 0){
      isLabelsUpdated.value = false
      firstLevelLabels.value = []
      secondLevelLabels.value = []
      thirdLevelLabels.value = []
      for (let i = 0; i < labelsLength; i++){
        firstLevelLabels.value.push(
          {
            ...defaultLabel, 
            id: i,
            index: i,
            numText: (i + 1).toString(),
          }
        )
      }
      combineCMKD()
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
      if (label.level == 0){
        const indexFirstLevel = firstLevelLabels.value.findIndex(l => l.id == labelId)
        firstLevelLabels.value[indexFirstLevel] = label
      }
      if (label.level == 1){
        const indexSecondLevel = secondLevelLabels.value.findIndex(l => l.id == labelId)
        secondLevelLabels.value[indexSecondLevel] = label
      }
      if (label.level == 2){
        const indexThirdLevel = thirdLevelLabels.value.findIndex(l => l.id == labelId)
        thirdLevelLabels.value[indexThirdLevel] = label
      }
      labels.value[index] = label
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
    firstLevelLabels,
    isLabelsUpdated,
    forceResetSelected,
    selectedLabel,
    drawingMode,
    showSupportRect,
    showImportant,
    allowInputPosition,
    position,
    levelNewLabel,
    newLabel,
    newCMKD,
    editLabel,
    deleteLabel,
  }
})