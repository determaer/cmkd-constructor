<script setup lang="ts">
  import { useLabelStore } from '../store/labelStore';

  const store = useLabelStore()


</script>

<template>
  <button @click="store.newLabel">
    Добавить узел
  </button>
  <button @click="store.newCMKD(10)">
    Сбросить карту
  </button>

</template>

<style scoped>

</style>
