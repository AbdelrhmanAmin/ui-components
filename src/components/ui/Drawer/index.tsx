import { motion } from 'motion/react'
import cn from '../../../utils/cn'
import createTriggerable from '../../utils/createTriggerable'
import { Position } from '../Panel'
import Overlay from '../Overlay'

const { createRoot, Trigger, useTrigger } = createTriggerable('Drawer')

const DrawerTrigger = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLElement> & {
    children: React.ReactNode
}) => {
    return (
        <Trigger className={className} {...props}>
            {children}
        </Trigger>
    )
}

const DrawerPositionalClass = {
    right: '!right-0 !top-0 max-w-sm !h-screen border-l-2 border-border',
    left: '!left-0 !top-0 max-w-sm !h-screen border-r-2 border-border',
    bottom: '!bottom-0 !left-0 !h-80 !w-screen border-t-2 border-border',
}

const DrawerVariants = {
    right: {
        initial: {
            x: '100%',
        },
        enter: {
            x: 0,
        },
        exit: {
            x: '100%',
        },
    },
    left: {
        initial: {
            x: '-100%',
        },
        enter: {
            x: 0,
        },
        exit: {
            x: '-100%',
        },
    },
    bottom: {
        initial: {
            y: '100%',
        },
        enter: {
            y: 0,
        },
        exit: {
            y: '100%',
        },
    },
}

const DrawerContent = ({
    children,
    className,
    position = 'right',
    ...props
}: {
    children: React.ReactNode
    position?: Omit<Position, 'top'>
    className?: string
}) => {
    const { isOpen, setIsOpen } = useTrigger()
    return (
        <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <motion.div
                variants={
                    DrawerVariants[position as keyof typeof DrawerVariants]
                }
                initial="initial"
                animate={isOpen ? 'enter' : 'exit'}
                className={cn(
                    '!fixed !bg-accent p-4',
                    DrawerPositionalClass[
                        position as keyof typeof DrawerPositionalClass
                    ],
                    className
                )}
                transition={{
                    type: 'tween',
                    ease: 'easeInOut',
                    duration: 0.3,
                }}
                {...props}
            >
                {children}
            </motion.div>
        </Overlay>
    )
}

const Drawer = createRoot({
    Trigger: DrawerTrigger,
    Content: DrawerContent,
})
export default Drawer

/*
@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0))}}
@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0))}}


*/
