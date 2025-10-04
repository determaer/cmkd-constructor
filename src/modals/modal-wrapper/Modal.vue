<script setup lang="ts">

const emit = defineEmits(['close', 'submit'])

const closeModalOutside = (evt: MouseEvent) => {
  if (evt.target instanceof HTMLElement && evt.target.classList.contains('modal-backdrop')) {
    emit('close')
  }
}

</script>

<template>
  <transition name="modal-fade">
    <div 
      class="modal-backdrop"
      @click="closeModalOutside"
    >
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <div
          id="modalDescription"
          class="modal-body"
        >
          <slot name="default" />
        </div>
        <div class="buttons">
          <button
            type="button"
            class="btn-green"
            aria-label="Close modal"
            @click="emit('submit')"
          >
            OK
          </button>
          <button
            type="button"
            class="btn-green"
            aria-label="Close modal"
            @click="emit('close')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;  
    align-items: center;
    z-index:1000;
}

.modal {
    background: #fff;
    box-shadow: 2px 2px 10px 1px;
    min-width: 300px;
    min-height: 300px;
    overflow-x: auto;
    display: flex; 
    flex-direction: column;
}

.buttons {
  display: block;
  margin: 10px 10px 10px 10px;
}

.modal-body {
    position: relative;
    padding: 20px 10px;
    flex-grow: 1;
}


.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.5s ease;
}
</style>
