import cn from 'classnames'
import { AnimatePresence, motion } from 'motion/react'
import { createContext, forwardRef, useContext, useState } from 'react'

import { Shared } from '../../types'
import Button from '../Button'

const displayName = 'Accordion'

const GlobalContext = createContext<{
    activeItems: { [key: string]: boolean }
    setActiveItem: (item: string) => void
}>({
    activeItems: {},
    setActiveItem: () => {},
})
const ItemContext = createContext<{
    isActive: boolean
    trigger: () => void
}>({
    isActive: false,
    trigger: () => {},
})
const Root = ({
    children,
    type,
    className,
}: Shared & {
    type: 'single' | 'multiple'
}) => {
    const [activeItems, setActiveItems] = useState<{
        [key: string]: boolean
    }>({})
    const setActive = (item: string) => {
        if (type === 'single') {
            setActiveItems((prev) => {
                const newState = { ...prev }
                if (newState[item] === undefined) newState[item] = true
                else newState[item] = !newState[item]
                for (const key in newState) {
                    if (key !== item) {
                        newState[key] = false
                    }
                }
                return newState
            })
        } else {
            setActiveItems((prev) => {
                const newState = { ...prev }
                if (newState[item] === undefined) newState[item] = true
                else newState[item] = !newState[item]
                return newState
            })
        }
    }
    return (
        <GlobalContext.Provider
            value={{
                setActiveItem: setActive,
                activeItems,
            }}
        >
            <div className={className}>{children}</div>
        </GlobalContext.Provider>
    )
}
Root.displayName = displayName

const Item = forwardRef(
    (
        {
            children,
            value,
            className,
        }: Shared & {
            value: string
        },
        ref: React.Ref<HTMLDivElement>
    ) => {
        const { activeItems, setActiveItem } = useContext(GlobalContext)
        const trigger = () => setActiveItem(value)

        const isActive = activeItems[value] || false

        return (
            <ItemContext.Provider value={{ isActive, trigger }}>
                <div
                    ref={ref}
                    className={cn(
                        'bg-background border-2 border-b-0 last-of-type:border-b-2 border-border',
                        className
                    )}
                >
                    {children}
                </div>
            </ItemContext.Provider>
        )
    }
)

Item.displayName = displayName + '.Item'

const TriggerButton = motion(Button)
const Trigger = ({ children, className }: Shared) => {
    const { trigger, isActive } = useContext(ItemContext)
    return (
        <TriggerButton
            variant="unstyled"
            onClick={trigger}
            className={cn(
                'flex flex-1 items-center justify-between py-4 p-2 text-sm font-medium w-full bg-primary',
                className
            )}
        >
            {children}
            <ChevronDown
                className={cn(
                    'h-4 w-4 shrink-0 transition-transform duration-200',
                    isActive ? 'rotate-180' : 'rotate-0'
                )}
            />
        </TriggerButton>
    )
}
Trigger.displayName = displayName + '.Trigger'
const Content = ({ children, className }: Shared) => {
    const { isActive } = useContext(ItemContext)
    return (
        <div className={cn(className, '!overflow-hidden')}>
            <AnimatePresence>
                <motion.section
                    initial="collapsed"
                    animate={isActive ? 'open' : 'collapsed'}
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
Content.displayName = displayName + '.Content'

const Accordion = Object.assign(Root, {
    Item,
    Trigger,
    Content,
})
Accordion.displayName = displayName
export default Accordion

const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M7 10l5 5 5-5H7z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)
