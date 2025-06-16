import React from 'react'
import createTriggerable from '../../utils/createTriggerable'
import cn from 'classnames'
import Button from '../Button'
import Collapse from '../../icons/Collapse'
import useMouseLeave from '../../utils/useMouseLeave'
import FloatingPanel, { FloatingPanelProps } from './FloatingPanel'
import useClickOutside from '../../utils/useClickOutside'
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
        onClick: () => setIsOpen(false),
        disabled: !isHoverable,
    })
    useClickOutside(setIsOpen, containerRef!)
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
    ...props
}: Omit<FloatingPanelProps, 'isOpen'>) => {
    const { isOpen } = useTrigger()
    return (
        <FloatingPanel isOpen={isOpen} {...props}>
            {children}
        </FloatingPanel>
    )
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
