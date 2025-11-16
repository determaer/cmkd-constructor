<script setup lang="ts">
import { useLabelStore } from "../store/labelStore";
import { useModalEditNode } from "../modals/useEditNode";
import { useTemplateRef } from "vue";

const store = useLabelStore();

const fileInput = useTemplateRef("fileInput");

const emit = defineEmits(["unselect", "download"]);

const editLabel = async () => {
  try {
    const labelId = store.selectedLabel ? store.selectedLabel.id : 0;
    const labelData = await useModalEditNode();
    store.editLabel(labelData, labelId);
    emit("unselect");
  } catch {}
};

const deleteLabel = () => {
  if (store.selectedLabel != undefined) {
    store.deleteLabel(store.selectedLabel?.level, store.selectedLabel?.id);
  }
  emit("unselect");
};

const addLabel = () => {
  store.addLabel();
};

const resetCMKDtoDefault = () => {
  store.createNewCMKD(5);
};

const exportCMKDtoFile = () => {
  try {
    const data = JSON.stringify([
      store.leveledLabels[0],
      store.leveledLabels[1],
      store.leveledLabels[2],
    ]);
    const blob = new Blob([data], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "cmkd.json";
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch {}
};

const exportCMKDtoImage = () => {
  emit("download");
};

const importCMKDfromFile = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const selectedFileToImport = (event: Event) => {
  try {
    const element = event.currentTarget as HTMLInputElement;
    const file = element?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = function () {
        const res = reader.result?.toString();
        if (res) {
          const cmkdObject: typeof store.leveledLabels = JSON.parse(res);
          store.setCMKDfromFile(cmkdObject);
        }
      };

      reader.onerror = function () {
        alert("Ошибка при чтении файла");
      };
    }
  } catch {}
};
</script>

<template>
  <div>
    <div>
      <button @click="addLabel">Добавить узел</button>
      <select v-model="store.levelNewLabel">
        <option v-for="i in 3" :key="i" :value="i - 1">
          {{ i - 1 }} уровня
        </option>
      </select>
    </div>

    <button @click="resetCMKDtoDefault">Сбросить карту</button>
    <button v-if="store.selectedLabel" @click="deleteLabel">
      Удалить узел
    </button>
    <button v-if="store.selectedLabel" @click="editLabel">
      Редактировать узел
    </button>
    <select v-model="store.drawingMode">
      <option value="default">Базовая</option>
      <option value="score">Частная</option>
      <option value="light">Частная упрощённая</option>
    </select>
  </div>
  <button @click="exportCMKDtoImage">Сохранить карту</button>
  <button @click="exportCMKDtoFile">Экспорт карты</button>
  <button @click="importCMKDfromFile">Импорт карты</button>
  <input
    ref="fileInput"
    type="file"
    style="display: none"
    accept=".json"
    @change="selectedFileToImport"
  />
  <div>
    <span>Включить опцию</span>
    <input v-model="store.allowInputPosition" type="checkbox" />
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
    <input v-model="store.showSupportRect" type="checkbox" />
  </div>
  <div>
    <span>Выделение важных связей</span>
    <input v-model="store.showImportant" type="checkbox" />
  </div>
</template>

<style scoped></style>
