<script setup lang="ts">
import Settings from "./components/Settings.vue";
import {
  CMKD,
  instanceOfLabel,
  instanceOfSector,
  type Info,
} from "@determaer/cmkd";
import { onBeforeMount, useTemplateRef } from "vue";
import { useLabelStore } from "./store/labelStore.js";

const cmkd = useTemplateRef("cmkd");

const store = useLabelStore();
const clickedElement = (info: Info) => {
  if (info.type == "label" && instanceOfLabel(info.object))
    store.selectedLabel = info.object;
  if (
    info.type == "sector" &&
    instanceOfSector(info.object) &&
    info.object.sLevel > 0 &&
    info.object.object
  )
    store.selectedLabel = info.object.object;
};

onBeforeMount(() => {
  store.createNewCMKD(5);
});
</script>

<template>
  <Settings
    @unselect="
      () => {
        store.selectedLabel = undefined;
        cmkd?.resetClicked();
      }
    "
    @download="
      () => {
        cmkd?.downloadURI();
      }
    "
  />
  <CMKD
    ref="cmkd"
    :labels="store.labels"
    :drawingMode="store.drawingMode"
    :showSupportRect="store.showSupportRect"
    :showImportant="store.showImportant"
    :position="store.allowInputPosition ? store.position : undefined"
    @clicked="
      (info) => {
        if (info) clickedElement(info);
      }
    "
    @unclicked="
      () => {
        store.selectedLabel = undefined;
      }
    "
  />
</template>

<style scoped></style>

