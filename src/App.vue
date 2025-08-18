<script setup lang="ts">
import Settings from './components/Settings.vue'
import { CMKD } from '@determaer/cmkd'
import { onBeforeMount } from 'vue'
import { useLabelStore } from './store/labelStore.js'
import type { Label } from './types/label.js'

const store = useLabelStore()
const clickedElement = (info: {object: Label}) => {
  store.selectedLabel = info.object
}

onBeforeMount(() => {
  store.newCMKD(5)
})
</script>

<template>
  <Settings 
    @unselect="() => {store.selectedLabel = undefined}"
  />
  <div v-if="store.isLabelsUpdated">
    <CMKD 
      :labels="store.labels"
      :force-reset-clicked="store.forceResetSelected"
      @clicked="clickedElement"
      @unclicked="() => {store.selectedLabel = undefined}"
    />
  </div>
  
</template>

<style scoped>

</style>
