<script setup lang="ts">
import Settings from './components/Settings.vue'
import { CMKD } from '@determaer/cmkd'
import { onBeforeMount, ref } from 'vue'
import { useLabelStore } from './store/labelStore.js'
import type { Label } from './types/label.js'

const store = useLabelStore()
const selectedLabel = ref<Label>()
const clickedElement = (info: {object: Label}) => {
  selectedLabel.value = info.object
  console.log(info.object)
}

onBeforeMount(() => {
  store.newCMKD(5)
})
</script>

<template>
  <Settings 
    @unselect="() => {selectedLabel = undefined}"
    :selectedLabel="selectedLabel"
  />
  <div v-if="store.isLabelsUpdated">
    <CMKD 
      :labels="store.labels"
      :force-reset-clicked="store.forceResetSelected"
      @clicked="clickedElement"
      @unclicked="() => {selectedLabel = undefined}"
    />
  </div>
  
</template>

<style scoped>

</style>
