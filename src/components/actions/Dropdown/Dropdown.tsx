import React from 'react'
import createTriggerable from '../../core/Triggerable'
import cn from 'classnames'
import Button from '../Button'
import { AnimatePresence, motion } from 'motion/react'
import Collapse from '../../icons/Collapse'

export type PositionY = 'top' | 'bottom'
export type PositionX = 'left' | 'right'

const { createRoot, Trigger, useTrigger } = createTriggerable('Dropdown')

const DropDownTrigger = ({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) => {
    const { isOpen } = useTrigger()
    return (
        <Trigger>
            <Button
                className={cn(
                    'inline-flex items-center gap-2 cursor-pointer',
                    'p-2 bg-gray-600 text-white font-medium rounded-md',
                    className
                )}
            >
                {children}
                <Collapse
                    className={cn('ml-2 transition-opacity', {
                        'opacity-50': !isOpen,
                        'opacity-100': isOpen,
                    })}
                />
            </Button>
        </Trigger>
    )
}

const DropDownContent = ({
    positionX = 'left',
    positionY = 'bottom',
    children,
    className,
}: {
    positionX?: PositionX
    positionY?: PositionY
    children: React.ReactNode
    className?: string
}) => {
    const { isOpen } = useTrigger()
    const stylePosition = handlePosition(positionX, positionY)

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

const handlePosition = (x: PositionX, y: PositionY) => {
    const position = {}
    if (x === 'left') {
        Object.assign(position, { left: '0' })
    } else if (x === 'right') {
        Object.assign(position, { right: '0' })
    }
    if (y === 'top') {
        Object.assign(position, { bottom: '100%' })
    } else if (y === 'bottom') {
        Object.assign(position, { top: '100%' })
    }
    return position
}

const DropDown = createRoot({
    Trigger: DropDownTrigger,
    Content: DropDownContent,
})

export default DropDown
