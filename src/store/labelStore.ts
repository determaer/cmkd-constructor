import { defineStore } from "pinia";
import { ref } from "vue";
import { type Label, defaultLabel } from "@determaer/cmkd";

export const useLabelStore = defineStore("labels", () => {
  const labels = ref<Label[]>([]);
  const selectedLabel = ref<Label>();
  const drawingMode = ref<"score" | "default" | "light">("default");
  const showSupportRect = ref(false);
  const showImportant = ref(false);
  const allowInputPosition = ref(false);
  const position = ref(0);
  const levelNewLabel = ref(0);
  const lastGivenID = ref(0);

  const firstLevelLabels = ref<Label[]>([]);
  const secondLevelLabels = ref<Label[]>([]);
  const thirdLevelLabels = ref<Label[]>([]);

  function combineCMKD() {
    labels.value = [];
    const tempLabels = labels.value.concat(
      thirdLevelLabels.value,
      secondLevelLabels.value,
      firstLevelLabels.value,
    );
    labels.value = tempLabels;
  }

  function setCMKDfromFile(
    newFirstLabels: Label[],
    newSecondLabels: Label[],
    newThirdLabels: Label[],
  ) {
    firstLevelLabels.value = newFirstLabels;
    secondLevelLabels.value = newSecondLabels;
    thirdLevelLabels.value = newThirdLabels;
    combineCMKD();
  }

  function newLabel() {
    //Учесть: для сводной карты отсчёт уровней идёт по убыванию - необходимо размещать высокоуровневые узлы в начале labels
    const newLabel = {
      ...defaultLabel,
      id: lastGivenID.value,
      numText: (labels.value.length + 1).toString(),
      level: levelNewLabel.value,
    };
    lastGivenID.value += 1;
    if (levelNewLabel.value == 0) firstLevelLabels.value.push(newLabel);
    if (levelNewLabel.value == 1) secondLevelLabels.value.push(newLabel);
    if (levelNewLabel.value == 2) thirdLevelLabels.value.push(newLabel);
    combineCMKD();
  }

  function newCMKD(labelsLength: number) {
    if (labelsLength > 0) {
      lastGivenID.value = 0;
      firstLevelLabels.value = [];
      secondLevelLabels.value = [];
      thirdLevelLabels.value = [];
      for (let i = 0; i < labelsLength; i++) {
        firstLevelLabels.value.push({
          ...defaultLabel,
          id: lastGivenID.value,
          numText: (i + 1).toString(),
        });
        lastGivenID.value += 1;
      }
      combineCMKD();
    }
  }

  function editLabel(label: Label, labelId: number) {
    if (label.level == 0) {
      const indexFirstLevel = firstLevelLabels.value.findIndex(
        (l) => l.id == labelId,
      );
      firstLevelLabels.value[indexFirstLevel] = label;
    }
    if (label.level == 1) {
      const indexSecondLevel = secondLevelLabels.value.findIndex(
        (l) => l.id == labelId,
      );
      secondLevelLabels.value[indexSecondLevel] = label;
    }
    if (label.level == 2) {
      const indexThirdLevel = thirdLevelLabels.value.findIndex(
        (l) => l.id == labelId,
      );
      thirdLevelLabels.value[indexThirdLevel] = label;
    }
    combineCMKD();
  }

  function deleteLabel(level: number, labelId: number) {
    if (level == 0) {
      const indexFirstLevel = firstLevelLabels.value.findIndex(
        (l) => l.id == labelId,
      );
      firstLevelLabels.value.splice(indexFirstLevel, 1);
    }
    if (level == 1) {
      const indexSecondLevel = secondLevelLabels.value.findIndex(
        (l) => l.id == labelId,
      );
      secondLevelLabels.value.splice(indexSecondLevel, 1);
    }
    if (level == 2) {
      const indexThirdLevel = thirdLevelLabels.value.findIndex(
        (l) => l.id == labelId,
      );
      thirdLevelLabels.value.splice(indexThirdLevel, 1);
    }
    combineCMKD();
  }

  return {
    labels,
    firstLevelLabels,
    secondLevelLabels,
    thirdLevelLabels,
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
    setCMKDfromFile,
  };
});

