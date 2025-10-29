import { Modal, useModal } from "@determaer/vue-use-modal";
import { type Label, instanceOfLabel } from "@determaer/cmkd";

type ReturnEditNode = {
  label: Label;
};

function typeofReturnEditNode(value: unknown): value is ReturnEditNode {
  return (
    value instanceof Object && "label" in value && instanceOfLabel(value.label)
  );
}

export const useModalEditNode = async (): Promise<Label | never> => {
  try {
    const data = await useModal<ReturnEditNode>({
      //в component должен быть встроен emit change(key: value)
      component: import("./EditNode.vue"),
      Modal,
    });
    if (typeofReturnEditNode(data)) {
      const label = data.label;
      return label;
    }
  } catch {}
  throw new Error();
};
