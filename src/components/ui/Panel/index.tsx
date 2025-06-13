import React from 'react'
import createTriggerable from '../../utils/createTriggerable'
import cn from 'classnames'
import Button from '../Button'
import { AnimatePresence, motion } from 'motion/react'
import Collapse from '../../icons/Collapse'
import useMouseLeave from '../../utils/useMouseLeave'
export type Position = 'top' | 'bottom' | 'left' | 'right'

const { createRoot, Trigger, useTrigger } = createTriggerable('Panel')

const PanelTriggerBase = ({
    children,
    className,
    isHoverable,
    as = 'div',
    ...props
}: React.HTMLAttributes<HTMLElement> & {
    isHoverable?: boolean
    as?: React.ElementType | React.FC<any>
}) => {
    const { containerRef, setIsOpen } = useTrigger()
    useMouseLeave({
        ref: containerRef,
        setOpen: setIsOpen,
        disabled: !isHoverable,
    })

    return (
        <Trigger
            as={as}
            className={cn(className)}
            {...(isHoverable && {
                onMouseEnter: () => setIsOpen(true),
            })}
            {...props}
        >
            {children}
        </Trigger>
    )
}

const PanelTriggerStyled = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLElement> & {
    disabled?: boolean
}) => {
    const { isOpen } = useTrigger()
    return (
        <PanelTriggerBase
            as={Button}
            className={cn(
                'inline-flex relative !justify-start items-center gap-1 cursor-pointer',
                'p-2 bg-gray-600 pr-12 text-white font-medium rounded-md',
                className
            )}
            {...props}
        >
            {children}
            <Collapse
                className={cn(
                    'right-2 top-1/2 -translate-y-1/2 absolute transition-opacity',
                    {
                        'opacity-50': !isOpen,
                        'opacity-100': isOpen,
                    }
                )}
            />
        </PanelTriggerBase>
    )
}

const PanelContent = ({
    children,
    className,
    position = 'bottom',
    ...props
}: {
    className?: string
    children: React.ReactNode
    position?: Position
    gutter?: number
}) => {
    const { isOpen } = useTrigger()

    const stylePosition = handlePosition(position, props.gutter)
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    style={{
                        position: 'absolute',
                        ...stylePosition,
                    }}
                    className={cn(className)}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const handlePosition = (position: Position, gutter: number = 0) => {
    const style = {}
    if (position.includes('top')) {
        Object.assign(style, { bottom: `calc(100% + ${gutter}px)` })
    } else if (position.includes('bottom')) {
        Object.assign(style, { top: `calc(100% + ${gutter}px)` })
    } else if (position.includes('left')) {
        Object.assign(style, { right: `calc(100% + ${gutter}px)`, top: 0 })
    } else if (position.includes('right')) {
        Object.assign(style, { left: `calc(100% + ${gutter}px)`, top: 0 })
    }
    return style
}

const Panel = Object.assign(
    createRoot({
        Trigger: PanelTriggerBase,
        Content: PanelContent,
    }),
    {
        StyledTrigger: PanelTriggerStyled,
    }
)

export default Panel
