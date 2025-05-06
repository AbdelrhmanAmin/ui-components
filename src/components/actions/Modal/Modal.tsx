import cn from 'classnames'
import createTriggerable from '../../core/Triggerable'
import { AnimatePresence, motion } from 'motion/react'
import useClickOutside from '../../utils/useClickOutside'

const { createRoot, Trigger, useTrigger } = createTriggerable('Modal')

const ModalContainer = ({
    children,
    className,
}: React.HTMLProps<HTMLDivElement>) => {
    const { isOpen, setIsOpen } = useTrigger()
    const { ref } = useClickOutside(setIsOpen)

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    animate={isOpen ? 'visible' : 'hidden'}
                    initial="hidden"
                    exit="hidden"
                    variants={{
                        visible: { opacity: 1 },
                        hidden: { opacity: 0 },
                    }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
                    tabIndex={-1}
                >
                    <div ref={ref} tabIndex={-1} className="p-8">
                        <motion.div
                            variants={{
                                visible: { opacity: 1, scale: 1 },
                                hidden: { opacity: 0, scale: 0.8 },
                            }}
                            className={cn(
                                'flex flex-col w-fit',
                                'bg-[#2E2E2E] !max-h-[calc(100vh-20px)] sm:max-h-[90%] min-h-[170px] shadow-md shadow-black border border-[#484848]',
                                className
                            )}
                        >
                            {children}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const Modal = createRoot({ Trigger, Content: ModalContainer })
Modal.displayName = 'Modal'

export default Modal
