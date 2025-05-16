import { AnimatePresence, motion } from 'motion/react'

import cn from 'classnames'
import Button from '../Button'
import createTriggerable from '../../utils/createTriggerable'
import Collapse from '../../icons/Collapse'
import { Shared } from '../../types'

const displayName = 'Collapsible'

const { createRoot, Trigger, useTrigger } = createTriggerable(displayName)

const TriggerButton = motion(Button)
const TriggerBase = ({ children, className }: Shared) => {
    return (
        <Trigger>
            <TriggerButton
                variant="unstyled"
                className={cn(
                    'flex flex-1 items-center justify-between py-4 text-sm font-medium',
                    className
                )}
            >
                {children}
                <Collapse className="ml-2" />
            </TriggerButton>
        </Trigger>
    )
}

const Content = ({ children, className }: Shared) => {
    const { isOpen } = useTrigger()
    return (
        <div className={cn(className, '!overflow-hidden')}>
            <AnimatePresence>
                <motion.section
                    initial="collapsed"
                    animate={isOpen ? 'open' : 'collapsed'}
                    exit="collapsed"
                    variants={{
                        open: { height: 'auto' },
                        collapsed: { height: 0 },
                    }}
                    transition={{
                        duration: 0.15,
                        easings: 'easeIn',
                    }}
                >
                    {children}
                </motion.section>
            </AnimatePresence>
        </div>
    )
}
const Collapsible = createRoot({
    Trigger: TriggerBase,
    Content,
})

export default Collapsible
