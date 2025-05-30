import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef } from 'react'
import { createStore, useStore } from 'zustand'
import cn from '../../../utils/cn'
type Position =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
export type Toast = {
    id: UUID
    message: string
    type: 'success' | 'error' | 'info'
    duration: number
    position?: Position
}

type INTERNAL_TOAST_STATE = {
    pausedAt: number | undefined
    timeoutID: NodeJS.Timeout | undefined
    height: number | undefined
    startAt: number | undefined
}

type UUID = string | number
export type ToastStore = {
    toasts: {
        [id: UUID]: Toast
    }
    internals: {
        [id: UUID]: INTERNAL_TOAST_STATE
    }
    isPaused: boolean
    addToast: (
        toast: Omit<
            Partial<Toast> & {
                message: string
            },
            'id'
        >
    ) => UUID
    removeToast: (id: UUID) => void
    pauseAll: () => void
    resumeAll: () => void
    updateHeight: (id: UUID, height: number) => void
}

const getTimeLeft = (startAt: number, duration: number): number => {
    if (!startAt || duration === 0 || duration === Infinity) return duration
    const currentTime = Date.now()
    const elapsedTime = currentTime - startAt
    const remainingTime = Math.max(0, duration - elapsedTime)
    return remainingTime
}

const defaultToastDuration = 3000
const defaultToastType: Toast['type'] = 'info'

const toastStore = createStore<ToastStore>((set, get) => ({
    toasts: {},
    internals: {},
    isPaused: false,
    addToast: (toast) => {
        const id: UUID = Math.random().toString(36).substring(2, 15)
        const instance = {
            type: defaultToastType,
            duration: defaultToastDuration,
            ...toast,
            id,
        }
        let timeoutID: NodeJS.Timeout | undefined
        let startAt: number | undefined
        if (instance.duration !== 0 && instance.duration !== Infinity) {
            startAt = Date.now()
            timeoutID = setTimeout(() => {
                get().removeToast(id)
            }, instance.duration)
        }
        set((state) => ({
            toasts: {
                ...state.toasts,
                [id]: instance,
            },
            internals: {
                ...state.internals,
                [id]: {
                    height: undefined,
                    pausedAt: undefined,
                    timeoutID,
                    startAt,
                },
            },
        }))

        return id
    },
    removeToast: (id) =>
        set((state) => {
            const prevInternals = { ...state.internals }
            const prevToasts = { ...state.toasts }
            delete prevInternals[id]
            delete prevToasts[id]
            return {
                toasts: prevToasts,
                internals: prevInternals,
            }
        }),

    pauseAll: () => {
        set((state) => ({
            isPaused: true,
            internals: Object.keys(state.internals).reduce(
                (acc, id) => {
                    const timeLeft = getTimeLeft(
                        state.internals[id].startAt!,
                        state.toasts[id].duration
                    )
                    if (timeLeft > 0) {
                        clearTimeout(state.internals[id].timeoutID)
                        return {
                            ...acc,
                            [id]: {
                                ...state.internals[id],
                                pausedAt: Date.now(),
                                timeoutID: undefined,
                            },
                        }
                    } else {
                        get().removeToast(id)
                    }
                    return acc
                },
                {} as typeof state.internals
            ),
        }))
    },
    resumeAll: () => {
        set((state) => ({
            isPaused: false,
            internals: Object.keys(state.internals).reduce(
                (acc, id) => {
                    const timeLeft = getTimeLeft(
                        state.internals[id].startAt!,
                        state.toasts[id].duration
                    )
                    if (timeLeft > 0) {
                        return {
                            ...acc,
                            [id]: {
                                ...state.internals[id],
                                pausedAt: Date.now(),
                                timeoutID: setTimeout(() => {
                                    get().removeToast(id)
                                }, timeLeft),
                            },
                        }
                    } else {
                        get().removeToast(id)
                    }
                    return acc
                },
                {} as typeof state.internals
            ),
        }))
    },
    updateHeight: (id, height) => {
        set((state) => ({
            internals: {
                ...state.internals,
                [id]: { ...state.internals[id], height },
            },
        }))
    },
}))

const calculateOffset = (toast: Toast, reverseOrder: boolean = false) => {
    const toasts = Object.values(toastStore.getState().toasts)
    const samePositionToasts = toasts.filter(
        (t) => t.position === toast.position
    )
    const index = samePositionToasts.findIndex((t) => t.id === toast.id)
    const beforeToasts = samePositionToasts.slice(0, index).length
    const offset = samePositionToasts
        .slice(...(reverseOrder ? [beforeToasts + 1] : [0, beforeToasts]))
        .reduce((acc, t) => {
            const internalInfo = toastStore.getState().internals[t.id]
            if (internalInfo) {
                return acc + (internalInfo.height ?? 0) + DEFAULT_GUTTER
            }
            return acc
        }, 0)
    return offset
}

type ToastOptions = Partial<Pick<Toast, 'type' | 'duration' | 'position'>>

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

const getPositionStyle = (position: Position, offset: number) => {
    const isTop = position.includes('top')
    const isRight = position.includes('right')
    const isCenter = position.includes('center')
    const Y = offset * (isTop ? 1 : -1)
    const style = {
        left: DEFAULT_OFFSET,
        right: DEFAULT_OFFSET,
        display: 'flex',
        position: 'absolute',
        zIndex: 9999,
        pointerEvents: 'auto',
        ...(isTop ? { top: DEFAULT_OFFSET } : { bottom: DEFAULT_OFFSET }),
        ...(isCenter
            ? { justifyContent: 'center' }
            : isRight
              ? { justifyContent: 'flex-end' }
              : { justifyContent: 'flex-start' }),
        transform: `translateY(${Y}px)`,
        y: Y,
    }
    return style
}

const DEFAULT_OFFSET = 16
const DEFAULT_GUTTER = 10

const Toaster = ({
    position = 'bottom-right',
    reverseOrder = false,
}: {
    position?: Position
    reverseOrder?: boolean
}) => {
    const { toasts: toastsById, pauseAll, resumeAll } = useStore(toastStore)
    const toasts = useMemo(() => {
        const toastsArray = Object.values(toastsById)

        return toastsArray
    }, [toastsById])

    return (
        <div
            style={{
                position: 'fixed',
                top: DEFAULT_OFFSET,
                left: DEFAULT_OFFSET,
                right: DEFAULT_OFFSET,
                bottom: DEFAULT_OFFSET,
                pointerEvents: 'none',
                display: 'flex',
            }}
        >
            <AnimatePresence>
                {toasts.map((toast) => {
                    const toastPosition = toast.position || position
                    const offset = calculateOffset(toast, reverseOrder)
                    const { y, ...positionStyle } = getPositionStyle(
                        toastPosition,
                        offset
                    )

                    return (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: y - 2, scaleZ: 0.9 }}
                            animate={{ opacity: 1, y, scaleZ: 1 }}
                            exit={{ opacity: 0, y: y - 2, scaleZ: 0.9 }}
                            style={positionStyle as React.CSSProperties}
                            onMouseEnter={pauseAll}
                            onMouseLeave={resumeAll}
                        >
                            <Toast key={toast.id} toast={toast} />
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </div>
    )
}

const Toast = ({
    toast,
}: {
    toast: Toast
} & React.HTMLAttributes<HTMLDivElement>) => {
    const { updateHeight, removeToast, isPaused, resumeAll } =
        useStore(toastStore)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref.current) {
            const height = ref.current.getBoundingClientRect().height
            updateHeight(toast.id, height)
        }
    }, [ref.current])
    return (
        <div
            ref={ref}
            className={cn(
                'font-medium p-4 w-fit h-fit rounded-lg shadow-md cursor-pointer z-[9999]',
                variants[toast.type],
                {
                    'animate-pulse': isPaused,
                }
            )}
            onClick={() => {
                removeToast(toast.id)
                resumeAll()
            }}
        >
            {toast.message}
        </div>
    )
}

export default Toaster
