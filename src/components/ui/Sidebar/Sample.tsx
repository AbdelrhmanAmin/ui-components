import { useContext, useEffect } from 'react'
import Sidebar, { useSidebar } from '.'
import cn from '../../../utils/cn'
import { Shared } from '../../types'
import Collapsible from '../Collapsible'
import { motion } from 'motion/react'

const GROUP_ITEMS: {
    title: string
    icon: React.ReactNode
    items: {
        title: string
        slug: string
    }[]
}[] = [
    {
        title: 'Dashboard',
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2L2 22h20L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        items: [
            {
                title: 'Home',
                slug: '/',
            },
            {
                title: 'Settings',
                slug: '/settings',
            },
            {
                title: 'Profile',
                slug: '/profile',
            },
            {
                title: 'Logout',
                slug: '/logout',
            },
        ],
    },
    {
        title: 'Settings',
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2L2 22h20L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        items: [
            {
                title: 'General',
                slug: '/settings/general',
            },
            {
                title: 'Appearance',
                slug: '/settings/appearance',
            },
            {
                title: 'Notifications',
                slug: '/settings/notifications',
            },
        ],
    },
    {
        title: 'Profile',
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2L2 22h20L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        items: [
            {
                title: 'Profile',
                slug: '/profile',
            },
            {
                title: 'Logout',
                slug: '/logout',
            },
        ],
    },
]

const GroupList = ({ children, className }: Shared) => {
    return (
        <Collapsible.Content
            className={cn(
                'flex flex-col gap-4 pl-4 py-3 ml-2 border-l border-border',
                className
            )}
        >
            {children}
        </Collapsible.Content>
    )
}

const GroupTitle = ({
    title,
    icon,
    className,
}: {
    title: string
    icon: React.ReactNode
    className?: string
}) => {
    const { isFolded } = useSidebar()
    const { setIsOpen } = useContext(Collapsible.ctx)
    useEffect(() => {
        if (isFolded) {
            setIsOpen(false)
        }
    }, [isFolded])
    return (
        <div
            className={cn('flex items-center gap-2 py-2', className, {
                'justify-center': isFolded,
            })}
        >
            <div className="w-4 h-4 flex items-center justify-center">
                {icon}
            </div>
            <Collapsible.Trigger className="!p-0" disabled={isFolded}>
                <motion.h2
                    variants={{
                        collapsed: {
                            width: 0,
                            opacity: 0,
                            scaleX: 0.5,
                        },
                        open: {
                            width: 'auto',
                            opacity: 1,
                            scaleX: 1,
                        },
                        exit: {
                            width: 0,
                            opacity: 0,
                            scaleX: 0.5,
                        },
                    }}
                    initial="collapsed"
                    animate={isFolded ? 'collapsed' : 'open'}
                    exit="exit"
                    transition={{
                        duration: 0.2,
                        ease: 'easeInOut',
                    }}
                    className={cn('text-sm font-semibold', className)}
                >
                    {title}
                </motion.h2>
            </Collapsible.Trigger>
        </div>
    )
}

const GroupItem = ({ children, className }: Shared) => {
    return (
        <div
            className={cn(
                'flex items-center gap-2 hover:underline cursor-pointer',
                className
            )}
        >
            {children}
        </div>
    )
}

export function AppSidebar() {
    const { isFolded } = useSidebar()
    return (
        <Sidebar>
            <Sidebar.Header>
                <div className="flex h-full w-full px-4 py-2 items-center gap-1">
                    <div
                        className={cn(
                            'w-4 h-4 flex items-center justify-center transition duration-500',
                            {
                                'w-9 h-9 text-secondary rotate-180': isFolded,
                            }
                        )}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2L2 22h20L12 2Z"
                                stroke="currentColor"
                                strokeWidth={isFolded ? '3' : '2'}
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h1
                        className={cn('text-base font-semibold', {
                            hidden: isFolded,
                        })}
                    >
                        Anger Inc.
                    </h1>
                </div>
            </Sidebar.Header>
            <Sidebar.Content>
                <div className="flex flex-col gap-2">
                    {GROUP_ITEMS.map((item) => (
                        <Collapsible key={item.title}>
                            <GroupTitle {...item} />

                            <GroupList>
                                {item.items.map((item) => (
                                    <GroupItem key={item.title}>
                                        <span className="text-sm">
                                            {item.title}
                                        </span>
                                    </GroupItem>
                                ))}
                            </GroupList>
                        </Collapsible>
                    ))}
                </div>
            </Sidebar.Content>
            <Sidebar.Footer className="flex justify-center items-center text-sm text-muted">
                Anger Inc.
            </Sidebar.Footer>
        </Sidebar>
    )
}
