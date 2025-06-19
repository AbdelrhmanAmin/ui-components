import { createContext, useContext, useLayoutEffect, useState } from 'react'
import { Shared } from '../../types'
import cn from '../../../utils/cn'
import Button from '../Button'
import { motion } from 'motion/react'
import useMediaQuery from '../../utils/useMediaQuery'

const SidebarContext = createContext<{
    isFolded: boolean
    setIsFolded: (isFolded: boolean) => void
} | null>(null)

export const SidebarProvider = ({ children }: Shared) => {
    const [isFolded, setIsFolded] = useState(false)
    return (
        <SidebarContext.Provider value={{ isFolded, setIsFolded }}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider')
    }
    return context
}

const STORYBOOK_PADDING_FIX = '!left-4'

const Sidebar = ({ children, className }: Shared) => {
    const { isFolded } = useSidebar()
    const isMobile = useMediaQuery('(max-width: 768px)')
    const [animationMemo, setAnimationMemo] = useState({})
    useLayoutEffect(() => {
        if (isMobile) {
            setAnimationMemo({
                initial: isFolded ? 'enter' : 'initial',
                animate: isFolded ? 'initial' : 'enter',
                variants: {
                    initial: {
                        x: '-100%',
                        width: 280,
                    },
                    enter: {
                        x: 0,
                        width: 280,
                    },
                },
                transition: {
                    type: 'tween',
                    ease: 'easeInOut',
                    duration: 0.3,
                },
            })
        } else {
            setAnimationMemo({
                initial: isFolded ? 'spread' : 'folded',
                animate: isFolded ? 'folded' : 'spread',
                variants: {
                    folded: {
                        width: 64,
                        x: 0,
                    },
                    spread: {
                        width: 280,
                        x: 0,
                    },
                },
                transition: {
                    duration: 0.2,
                    ease: 'easeInOut',
                },
            })
        }
    }, [isFolded, isMobile])

    return (
        <motion.aside
            {...animationMemo}
            className={cn(
                'flex flex-col h-svh fixed inset-y-0 left-0 z-10',
                className,
                {
                    [STORYBOOK_PADDING_FIX]: import.meta.env.STORYBOOK,
                }
            )}
        >
            {children}
            <SidebarCollapse />
        </motion.aside>
    )
}

const SidebarCollapse = () => {
    const { isFolded, setIsFolded } = useSidebar()
    return (
        <div
            style={{
                position: 'absolute',
                right: '-25px',
                top: '40px',
            }}
        >
            <Button variant="primary" onClick={() => setIsFolded(!isFolded)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                >
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M9 3v18"></path>
                </svg>
            </Button>
        </div>
    )
}

const SidebarHeader = ({ children, className }: Shared) => {
    return (
        <header className={cn('h-16 bg-accent', className)}>{children}</header>
    )
}

const SidebarContent = ({ children, className }: Shared) => {
    return (
        <main
            className={cn(
                'flex-1 overflow-y-auto overflow-x-clip  bg-primary py-4 px-2',
                className
            )}
        >
            {children}
        </main>
    )
}

const SidebarFooter = ({ children, className }: Shared) => {
    return (
        <footer className={cn('h-16 bg-accent', className)}>{children}</footer>
    )
}

Sidebar.Header = SidebarHeader
Sidebar.Content = SidebarContent
Sidebar.Footer = SidebarFooter

export default Sidebar
