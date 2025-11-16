import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { type Label, defaultLabel } from "@determaer/cmkd";

export const useLabelStore = defineStore("labels", () => {
  const labels = computed(() => [
    ...leveledLabels.value[2],
    ...leveledLabels.value[1],
    ...leveledLabels.value[0],
  ]);
  const selectedLabel = ref<Label>();
  const drawingMode = ref<"score" | "default" | "light">("default");
  const showSupportRect = ref(false);
  const showImportant = ref(false);
  const showDefaultRect = ref(false);
  const allowInputPosition = ref(false);
  const position = ref(0);
  const levelNewLabel = ref(0);
  const lastGivenID = computed(() => labels.value.length);

  const leveledLabels = ref<[Label[], Label[], Label[]]>([[], [], []]);

  function setCMKDfromFile(CMKDObject: typeof leveledLabels.value) {
    leveledLabels.value = CMKDObject;
  }

  function addLabel() {
    //Учесть: для сводной карты отсчёт уровней идёт по убыванию - необходимо размещать высокоуровневые узлы в начале labels
    const newLabel = {
      ...defaultLabel,
      id: lastGivenID.value,
      numText: (labels.value.length + 1).toString(),
      level: levelNewLabel.value,
    };
    leveledLabels.value[levelNewLabel.value].push(newLabel);
  }

  function createNewCMKD(labelsLength: number) {
    if (labelsLength > 0) {
      leveledLabels.value = [[], [], []];

      for (let i = 0; i < labelsLength; i++) {
        leveledLabels.value[0].push({
          ...defaultLabel,
          id: lastGivenID.value,
          numText: (i + 1).toString(),
        });
      }
    }
  }

  function editLabel(label: Label, labelId: number) {
    const indexLabel = leveledLabels.value[label.level].findIndex(
      (l) => l.id == labelId,
    );
    leveledLabels.value[label.level][indexLabel] = label;
  }

  function deleteLabel(level: number, labelId: number) {
    const indexLabel = leveledLabels.value[level].findIndex(
      (l) => l.id == labelId,
    );
    leveledLabels.value[level].splice(indexLabel, 1);
  }

  return {
    labels,
    leveledLabels,
    selectedLabel,
    drawingMode,
    showSupportRect,
    showImportant,
    showDefaultRect,
    allowInputPosition,
    position,
    levelNewLabel,
    addLabel,
    createNewCMKD,
    editLabel,
    deleteLabel,
    setCMKDfromFile,
  };
});

