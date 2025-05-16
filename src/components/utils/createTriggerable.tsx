import cn from 'classnames'
import React, { createContext, useContext, useMemo, useState } from 'react'
import useClickOutside from './useClickOutside'

type API = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
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
        as: Component = 'div',
        asChild = false,
        ...props
    }: React.HTMLAttributes<HTMLDivElement> & {
        children: React.ReactNode | ((props: Partial<API>) => React.ReactNode)
        as?: React.FC<any> | React.ElementType
        asChild?: boolean
    }) => {
        const { isOpen, setIsOpen } = useContext(CTX)
        if (typeof children === 'function') {
            return children({ isOpen, setIsOpen })
        }

        if (asChild) {
            return React.cloneElement(children as React.ReactElement, {
                onClick: () => setIsOpen(!isOpen),
                ...props,
            })
        }
        return (
            <Component
                role="button"
                onClick={() => setIsOpen(!isOpen)}
                className={className}
                {...props}
            >
                {children}
            </Component>
        )
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
            ctx: CTX,
        })
        return root
    }

    return { createRoot, Trigger, useTrigger, Root }
}

export default createTriggerable
