<script setup lang="ts">
import Settings from './components/Settings.vue'
import {CMKD} from '@determaer/cmkd'
import { onBeforeMount } from 'vue'
import {labels} from './labelsNew.js'
import { useLabelStore } from './store/labelStore.js'

const store = useLabelStore()

onBeforeMount(() => {
  store.newCMKD(5)
})
</script>

<template>
  <Settings />
  <div v-if="store.isLabelsUpdated">
  <CMKD 
      :labels="store.labels"
    />
  </div>
  
</template>

<style scoped>

</style>
