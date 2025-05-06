import cn from 'classnames'
import React, { createContext, useContext, useMemo, useState } from 'react'
import useClickOutside from '../utils/useClickOutside'

type API = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    meta: Record<string, any>
    setMeta: React.Dispatch<React.SetStateAction<Record<string, any>>>
    containerRef: React.RefObject<HTMLDivElement> | null
}

type TriggerableChildren = [
    JSX.Element & { type: { displayName: 'Triggerable.Trigger' } },
    JSX.Element & { type: { displayName: 'Triggerable.Content' } },
]

type RootProps = {
    children: TriggerableChildren
    isOpenByDefault?: boolean
    className?: string
}

const createRandomId = (displayName: string) => {
    const randomId = `${displayName}-${Math.random().toString(36).slice(2, 9)}`
    return randomId
}
const createTriggerable = (displayName: string) => {
    const CTX = createContext<API>({
        isOpen: false,
        setIsOpen: () => {},
        meta: {},
        setMeta: () => {},
        containerRef: null,
    })

    const Trigger = ({
        children,
        className,
    }: {
        children: React.ReactNode | ((props: Partial<API>) => React.ReactNode)
        className?: string
    }) => {
        const { isOpen, setIsOpen } = useContext(CTX)
        if (typeof children === 'function') {
            return children({ isOpen, setIsOpen })
        }
        if (!React.isValidElement(children)) {
            if (typeof children === 'string') {
                return (
                    <div
                        role="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className={className}
                    >
                        {children}
                    </div>
                )
            }
            throw new Error(
                `Children must be a valid React element...type is ${typeof children}`
            )
        }
        return React.cloneElement(children as React.ReactElement, {
            onClick: () => setIsOpen(!isOpen),
        })
    }
    Trigger.displayName = `Triggerable.Trigger`

    const Root: React.FC<RootProps> = ({
        children,
        isOpenByDefault,
        className,
    }) => {
        const [open, setOpen] = useState(isOpenByDefault || false)
        const [meta, setMeta] = useState<Record<string, any>>({})
        const { ref } = useClickOutside(setOpen)
        const randomID = useMemo(() => createRandomId(displayName), [])
        return (
            <CTX.Provider
                value={{
                    meta,
                    setMeta,
                    isOpen: open,
                    setIsOpen: setOpen,
                    containerRef: ref,
                }}
            >
                <div
                    className={cn('relative', className)}
                    ref={ref}
                    id={randomID}
                >
                    {children}
                </div>
            </CTX.Provider>
        )
    }

    const useTrigger = () => {
        if (!useContext(CTX))
            throw new Error(
                'useTrigger must be used within a Triggerable component'
            )
        return useContext(CTX)
    }

    Root.displayName = displayName

    const createRoot = <T, C>({
        Trigger: propTrigger,
        Content,
    }: {
        Trigger?: T
        Content?: C
    }) => {
        const root = Object.assign(Root, {
            Trigger: propTrigger || Trigger,
            Content: Content || (() => null),
        })
        return root
    }

    return { createRoot, Trigger, useTrigger, Root }
}

export default createTriggerable
