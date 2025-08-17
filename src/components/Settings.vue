<script setup lang="ts">
import { useLabelStore } from '../store/labelStore';
import type { Label } from '../types/label';
const store = useLabelStore()

defineProps({
  selectedLabel: Object as () => Label,
})

const emit = defineEmits(['unselect'])
</script>

<template>
  <button @click="store.newLabel()">
    Добавить узел
  </button>
  <button @click="store.newCMKD(10)">
    Сбросить карту
  </button>
  <button 
    v-if="selectedLabel"
    @click="() => {
      emit('unselect')
      store.deleteLabel(selectedLabel ? selectedLabel.id : 0)
    }"
  >
    Удалить узел
  </button>
  <button v-if="selectedLabel">
    Редактировать узел
  </button>
</template>

<style scoped>

</style>
