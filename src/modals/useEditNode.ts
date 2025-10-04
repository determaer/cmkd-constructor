import { useModal } from './modal-wrapper/useModal';
import Modal from './modal-wrapper/Modal.vue';
import { instanceOfLabel, type Label } from '../types/label';

export const useModalEditNode = async () => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('./EditNode.vue'),
    Modal,
  })
  if (data.label){
    if (instanceOfLabel(data.label)){
      return data.label as Label
    }
  }
  return false
}
