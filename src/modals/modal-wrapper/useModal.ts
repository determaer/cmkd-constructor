import {
    createApp,
    defineComponent,
    h,
    ref,
    defineAsyncComponent,
} from 'vue'

import type { App } from 'vue'

export function useModal<T>({component, attrs, Modal, modalAttrs}: any): Promise<any> {
    return new Promise((resolve) => {
        const modalDiv = document.createElement('div')
        document.body.appendChild(modalDiv)

        const Data = ref<any>({})
        const closeHandler = () => {
            app.unmount()
            document.body.removeChild(modalDiv)
        }

        const submitHandler = () => {
            closeHandler()
            // console.log('ddd', Data.value)
            resolve(Data.value as any)
        }

        const changeDataHandler = (data: any) => {
            Object.keys(data).forEach(key => {
                Data.value[key] = data[key]
            })
        }

        const ModalWrapper = defineComponent({
            render() {
                return h(
                    Modal as any,
                    {
                        ...modalAttrs,
                        onClose: closeHandler,
                        onSubmit: submitHandler,
                    },
                    {
                        default: () =>
                            h(
                                defineAsyncComponent(() => component),
                                {
                                    ...attrs,
                                    onChange: changeDataHandler,
                                    onSubmit: submitHandler,
                                    onClose: closeHandler,
                                }
                            ),
                    }
                )
            },
        })

        const app: App = createApp(ModalWrapper)
        app.mount(modalDiv)
    })
}
