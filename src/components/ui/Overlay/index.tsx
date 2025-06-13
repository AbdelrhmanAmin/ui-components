import { AnimatePresence, motion } from 'motion/react'

const Overlay = ({
    children,
    isOpen,
    onClose,
}: {
    children: React.ReactNode
    isOpen: boolean
    onClose?: () => void
}) => {
    const onlyCloseWhenClickingOnOverlay = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        if (e.target === e.currentTarget) {
            onClose?.()
        }
    }
    return (
        <AnimatePresence>
            <motion.div
                initial="initial"
                animate={isOpen ? 'visible' : 'exit'}
                variants={{
                    initial: { visibility: 'hidden' },
                    visible: { visibility: 'visible' },
                    exit: {
                        visibility: 'hidden',
                    },
                }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                tabIndex={-1}
                onClick={onlyCloseWhenClickingOnOverlay}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default Overlay
