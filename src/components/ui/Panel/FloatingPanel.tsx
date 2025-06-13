import { AnimatePresence, motion } from 'motion/react'
import { Position } from '.'
import cn from 'classnames'

export interface FloatingPanelProps {
    className?: string
    children: React.ReactNode
    position?: Position
    gutter?: number
    isOpen: boolean
}

const FloatingPanel = ({
    children,
    className,
    position = 'bottom',
    isOpen,
    ...props
}: FloatingPanelProps) => {
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

export default FloatingPanel
