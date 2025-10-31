<script setup lang="ts">
import { useLabelStore } from "../store/labelStore";
import { useModalEditNode } from "../modals/useEditNode";
import { useTemplateRef } from "vue";
import { type Label } from "@determaer/cmkd";

const store = useLabelStore();

const fileInput = useTemplateRef("fileInput");

const emit = defineEmits(["unselect", "download"]);

const editNode = async () => {
  const labelId = store.selectedLabel ? store.selectedLabel.id : 0;
  const labelData = await useModalEditNode();
  store.editLabel(labelData, labelId);
  emit("unselect");
};

const exportCMKDtoFile = () => {
  console.log(
    store.firstLevelLabels,
    store.secondLevelLabels,
    store.thirdLevelLabels,
  );
  const data = JSON.stringify([
    store.firstLevelLabels,
    store.secondLevelLabels,
    store.thirdLevelLabels,
  ]);
  const blob = new Blob([data], { type: "text/plain" });
  const link = document.createElement("a");
  link.download = "cmkd.json";
  link.href = window.URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const importCMKDfromFile = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const selectedFileToImport = (event: Event) => {
  const element = event.currentTarget as HTMLInputElement;
  const file = element?.files?.[0];
  if (file) {
    console.log(file);
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function () {
      const res = reader.result?.toString();
      if (res) {
        const cmkdObject: [Label[], Label[], Label[]] = JSON.parse(res);
        store.setCMKDfromFile(cmkdObject[0], cmkdObject[1], cmkdObject[2]);
      }
    };

    reader.onerror = function () {
      alert("Ошибка при чтении файла");
    };
  }
};
</script>

<template>
  <div>
    <div>
      <button @click="store.newLabel()">Добавить узел</button>
      <select v-model="store.levelNewLabel">
        <option v-for="i in 3" :key="i" :value="i - 1">
          {{ i - 1 }} уровня
        </option>
      </select>
    </div>

    <button @click="store.newCMKD(5)">Сбросить карту</button>
    <button
      v-if="store.selectedLabel"
      @click="
        () => {
          const labelId = store.selectedLabel ? store.selectedLabel.id : 0;
          const level = store.selectedLabel?.level
            ? store.selectedLabel.level
            : 0;
          emit('unselect');
          store.deleteLabel(level, labelId);
        }
      "
    >
      Удалить узел
    </button>
    <button v-if="store.selectedLabel" @click="editNode">
      Редактировать узел
    </button>
    <select v-model="store.drawingMode">
      <option value="default">Базовая</option>
      <option value="score">Частная</option>
      <option value="light">Частная упрощённая</option>
    </select>
  </div>
  <button @click="emit('download')">Сохранить карту</button>
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
