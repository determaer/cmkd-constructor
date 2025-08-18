<script setup lang="ts">
import Settings from './components/Settings.vue'
import { CMKD } from '@determaer/cmkd'
import { onBeforeMount, ref } from 'vue'
import { useLabelStore } from './store/labelStore.js'
import type { Label } from './types/label.js'

const cmkd = ref()

const store = useLabelStore()
const clickedElement = (info: {object: Label, type: string}) => {
  if (info.type == 'label')
    store.selectedLabel = info.object
}

onBeforeMount(() => {
  store.newCMKD(5)
})
</script>

<template>
  <Settings 
    @unselect="() => {store.selectedLabel = undefined}"
    @download="() => {cmkd.downloadURI()}"
  />
  <div v-if="store.isLabelsUpdated">
    <CMKD 
      ref="cmkd"
      :labels="store.labels"
      :force-reset-clicked="store.forceResetSelected"
      :drawingMode="store.drawingMode"
      :showSupportRect="store.showSupportRect"
      :showImportant="store.showImportant"
      :position="store.allowInputPosition ? store.position : undefined"
      @clicked="clickedElement"
      @unclicked="() => {store.selectedLabel = undefined}"
    />
  </div>
  
</template>

<style scoped>

</style>
