import createTriggerable from '../../utils/createTriggerable'
import { AnimatePresence, motion } from 'motion/react'
import useClickOutside from '../../utils/useClickOutside'
import cn from '../../../utils/cn'
import Overlay from '../Overlay'

const { createRoot, Trigger, useTrigger } = createTriggerable('Modal')

const ModalContainer = ({
    children,
    className,
}: React.HTMLProps<HTMLDivElement>) => {
    const { isOpen, setIsOpen } = useTrigger()
    const { ref } = useClickOutside(setIsOpen)

    return (
        <Overlay isOpen={isOpen}>
            <AnimatePresence>
                {isOpen && (
                    <div ref={ref} tabIndex={-1} className="p-8">
                        <motion.div
                            variants={{
                                visible: { opacity: 1, scale: 1 },
                                hidden: { opacity: 0, scale: 0.8 },
                            }}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className={cn(
                                'flex flex-col w-fit',
                                'bg-[#2E2E2E] !max-h-[calc(100vh-20px)] sm:max-h-[90%] min-h-[170px] shadow-md shadow-black border border-[#484848]',
                                className
                            )}
                        >
                            {children}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Overlay>
    )
}

const Modal = createRoot({ Trigger, Content: ModalContainer })
Modal.displayName = 'Modal'

export default Modal
