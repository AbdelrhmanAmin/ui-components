import { forwardRef, useRef } from 'react'
import cn from '../../../utils/cn'
import { AnimatePresence, motion } from 'motion/react'
import useControllableState from '../../utils/useControllableState'

type BasicProps = Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'onChange' | 'value' | 'checked'
>
type ToggleElement = React.ComponentRef<'button'>
interface StandaloneToggleI extends BasicProps {
    checked?: boolean
    onChange?: (checked: boolean) => void
    value?: never
}

interface GroupedToggleI extends BasicProps {
    value: string
    onChange?: (value: string) => void
    checked?: boolean
}

const booleanize = (value?: unknown): boolean | 'unknown' => {
    if (typeof value === 'string') {
        if (value === 'true') return true
        if (value === 'false') return false
    }
    if (typeof value === 'boolean') return value
    return 'unknown'
}

type ToggleProps = StandaloneToggleI | GroupedToggleI

const StandaloneToggle = forwardRef<ToggleElement, StandaloneToggleI>(
    ({ children, onChange, checked, ...props }, ref) => {
        const [isChecked, setChecked] = useControllableState({
            value: checked,
            onChange,
            defaultValue: false,
        })
        return (
            <button
                {...props}
                ref={ref}
                type="button"
                data-checked={booleanize(checked) === true ? 'on' : 'off'}
                data-disabled={props.disabled ? 'true' : 'false'}
                onClick={() => {
                    setChecked(!isChecked)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setChecked(!isChecked)
                    }
                }}
            >
                {children}
            </button>
        )
    }
)
StandaloneToggle.displayName = 'StandaloneToggle'

const GroupedToggle = forwardRef<ToggleElement, GroupedToggleI>(
    ({ children, onChange, value, checked, ...props }, ref) => {
        return (
            <button
                {...props}
                ref={ref}
                type="button"
                data-checked={booleanize(checked) === true ? 'on' : 'off'}
                data-disabled={props.disabled ? 'true' : 'false'}
                onClick={() => {
                    onChange?.(value)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onChange?.(value)
                    }
                }}
            >
                {children}
            </button>
        )
    }
)

GroupedToggle.displayName = 'GroupedToggle'

const ToggableArea = forwardRef<ToggleElement, ToggleProps>(
    ({ children, value, onChange, ...props }, ref) => {
        if (value !== undefined) {
            return (
                <GroupedToggle
                    ref={ref}
                    {...props}
                    onChange={onChange}
                    value={value}
                >
                    {children}
                </GroupedToggle>
            )
        }
        return (
            <StandaloneToggle ref={ref} {...props} onChange={onChange}>
                {children}
            </StandaloneToggle>
        )
    }
)

ToggableArea.displayName = 'ToggableArea'

const Toggle = forwardRef<ToggleElement, ToggleProps>(
    ({ children, ...props }, ref) => {
        return (
            <ToggableArea
                ref={ref}
                {...props}
                className={cn(
                    'p-2 rounded-sm transition-colors duration-200 ease-in-out text-white',
                    'data-[checked="on"]:bg-accent data-[checked="off"]:bg-accent/60',
                    props.className
                )}
            >
                {children}
            </ToggableArea>
        )
    }
)

Toggle.displayName = 'Toggle'

const Checkbox = ({ children }: BasicProps) => {
    const ref = useRef<HTMLButtonElement>(null)
    return (
        <ToggableArea
            ref={ref}
            className='flex items-center gap-1 font-medium text-accent data-[checked="off"]:text-accent/40'
        >
            <AnimatePresence>
                <span
                    className={cn(
                        'flex items-center justify-center w-4 h-4 rounded-sm',
                        'data-[checked="on"]:bg-accent',
                        'data-[checked="off"]:bg-accent/40'
                    )}
                >
                    <motion.svg
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.1 }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20 6L9 17l-5-5" />
                    </motion.svg>
                </span>
            </AnimatePresence>
            {children}
        </ToggableArea>
    )
}

export default Toggle
export { Checkbox }
