import { Modal, useModal } from '@determaer/vue-use-modal'
import { instanceOfLabel, type Label } from '../types/label';

export const useModalEditNode = async () : Promise<Label | never> => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('./EditNode.vue'),
    Modal,
  })
  if (data.label){
    const label = data.label
    if (instanceOfLabel(label)){
      return label
    }
  }
  throw new Error()
}
