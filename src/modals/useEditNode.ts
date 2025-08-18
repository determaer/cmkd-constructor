import { useModal } from './modal-wrapper/useModal';
import Modal from './modal-wrapper/Modal.vue';

export const useModalEditNode = async () => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('./EditNode.vue'),
    attrs: {
    },
    Modal,
    modalAttrs: {
    },
  });
  console.log('data', data);
  return data;
}
