import cn from 'classnames'
import { AnimatePresence, motion } from 'motion/react'
import React from 'react'
import createTriggerable from '../../utils/createTriggerable'
import Chevron from '../../icons/Chevron'
import useClickOutside from '../../utils/useClickOutside'
import useMouseLeave from '../../utils/useMouseLeave'

const { Root, useTrigger } = createTriggerable('ContextMenu')

const Trigger: React.FC<
    React.HTMLAttributes<HTMLDivElement> & {
        as?: React.ElementType
        isSub?: true
    }
> = ({ children, className, as, isSub }) => {
    const { setIsOpen, setMeta, isOpen, containerRef } = useTrigger()

    const handleContextMenu = (e: MouseEvent) => {
        if (isOpen) return
        e.preventDefault()

        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        const { clientX, clientY } = e
        const position = {
            x: isSub ? rect.right : clientX,
            y: isSub ? rect.top : clientY,
        }
        setMeta((prev) => ({
            ...prev,
            position,
        }))
        setIsOpen(true)
    }

    useMouseLeave({
        ref: containerRef,
        setOpen: setIsOpen,
        disabled: !isSub,
    })

    const Tag = as || 'div'
    return (
        <Tag
            className={cn(className, {
                relative: !!isSub,
            })}
            onContextMenu={handleContextMenu}
            {...(isSub && {
                onMouseEnter: handleContextMenu,
            })}
        >
            {children}
            {isSub && (
                <span className="absolute top-3 right-2">
                    <Chevron side="right" />
                </span>
            )}
        </Tag>
    )
}

const Content: React.FC<
    React.HTMLAttributes<HTMLUListElement> & { as?: React.ElementType }
> = ({ children, className, as }) => {
    const { meta, setIsOpen, isOpen } = useTrigger()
    const { ref } = useClickOutside(setIsOpen)
    const Tag = motion.create(as || 'ul')
    return (
        <AnimatePresence>
            {isOpen && (
                <Tag
                    initial={{
                        opacity: 0,
                        scale: 0.95,
                        y: -1,
                        x: -5,
                    }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                    exit={{
                        opacity: 0,
                        scale: 0.95,
                        transition: { duration: 0.15 },
                    }}
                    transition={{
                        type: 'tween',
                        stiffness: 300,
                        damping: 25,
                        duration: 0.05,
                    }}
                    ref={ref}
                    style={{
                        top: meta.position?.y,
                        left: meta.position?.x,
                        position: 'fixed',
                        minWidth: '300px',
                    }}
                    className={cn(
                        'flex flex-col z-50 rounded overflow-hidden shadow-lg origin-top-left',
                        className
                    )}
                >
                    {children}
                </Tag>
            )}
        </AnimatePresence>
    )
}
const Item: React.FC<
    React.HTMLAttributes<HTMLLIElement> & { as?: React.ElementType }
> = ({ children, className, as }) => {
    const { setIsOpen } = useTrigger()
    const Tag = as || 'li'
    return (
        <Tag
            className={cn(
                'p-2 px-4 bg-zinc-700 hover:contrast-125 transition cursor-pointer',
                className
            )}
            onClick={() => setIsOpen(false)}
        >
            {children}
        </Tag>
    )
}

const ContextMenu = Root as typeof Root & {
    Trigger: typeof Trigger
    Content: typeof Content
    Item: typeof Item
}
ContextMenu.Trigger = Trigger
ContextMenu.Content = Content
ContextMenu.Item = Item
export default ContextMenu
