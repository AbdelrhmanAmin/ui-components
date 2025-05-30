import { AnimatePresence, motion } from 'motion/react'
import { createStore, useStore } from 'zustand'
import cn from '../../../utils/cn'

type Toast = {
    id: UUID
    message: string
    type: 'success' | 'error' | 'info'
    duration: number
}

type UUID = string | number
type ToastStore = {
    toasts: Toast[]
    addToast: (
        toast: Omit<
            Partial<Toast> & {
                message: string
            },
            'id'
        >
    ) => UUID
    removeToast: (id: UUID) => void
}

const defaultToastDuration = 3000
const defaultToastType: Toast['type'] = 'info'

const toastStore = createStore<ToastStore>((set) => ({
    toasts: [],
    addToast: (toast) => {
        const id: UUID = Math.random().toString(36).substring(2, 15)
        const instance = {
            type: defaultToastType,
            duration: defaultToastDuration,
            ...toast,
            id,
        }
        set((state) => ({
            toasts: [...state.toasts, instance],
        }))
        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id),
            }))
        }, instance.duration)

        return id
    },
    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        })),
}))

type ToastOptions = Partial<Pick<Toast, 'type' | 'duration'>>

export const toast = (
    message: string,
    options: ToastOptions = {
        type: defaultToastType,
        duration: defaultToastDuration,
    }
) => {
    return toastStore.getState().addToast({ message, ...options })
}

const variants = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-primary text-white',
}

const Toaster = () => {
    const { toasts } = useStore(toastStore)
    return (
        <div className="fixed bottom-5 right-10 z-50">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        className={cn(
                            'font-medium p-4 rounded-lg mb-2 shadow-md',
                            variants[toast.type]
                        )}
                        initial={{ opacity: 0, y: 2, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 2, scale: 0.9 }}
                    >
                        {toast.message}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

export default Toaster
