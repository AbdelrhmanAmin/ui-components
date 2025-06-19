import { AnimatePresence, motion } from 'motion/react'

import cn from 'classnames'
import Button from '../Button'
import createTriggerable from '../../utils/createTriggerable'
import Collapse from '../../icons/Collapse'
import { Shared } from '../../types'

const displayName = 'Collapsible'

const { createRoot, Trigger, useTrigger } = createTriggerable(displayName)

const TriggerButton = motion(Button)
const TriggerBase = ({
    children,
    className,
    disabled,
}: Shared & { disabled?: boolean }) => {
    return (
        <Trigger>
            <TriggerButton
                variant="unstyled"
                className={cn(
                    'flex flex-1 items-center justify-between py-4 text-sm font-medium',
                    className
                )}
                disabled={disabled}
            >
                {children}
                <Collapse
                    className={cn('ml-2', {
                        hidden: disabled,
                    })}
                />
            </TriggerButton>
        </Trigger>
    )
}
const Content = ({ children, className }: Shared) => {
    const { isOpen } = useTrigger()

    return (
        <AnimatePresence>
            <motion.section
                initial="collapsed"
                animate={isOpen ? 'open' : 'exit'}
                exit="exit"
                variants={{
                    collapsed: {
                        height: 0,
                        visibility: 'hidden',
                    },
                    open: {
                        height: 'auto',
                        visibility: 'visible',
                    },
                    exit: {
                        height: 0,
                        visibility: 'hidden',
                    },
                }}
                transition={{
                    duration: 0.15,
                    easings: 'easeIn',
                }}
                className={cn('overflow-hidden', className)}
            >
                {children}
            </motion.section>
        </AnimatePresence>
    )
}
const Collapsible = createRoot({
    Trigger: TriggerBase,
    Content,
})

export default Collapsible
