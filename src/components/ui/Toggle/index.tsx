import { forwardRef, useRef, useState } from 'react'
import cn from '../../../utils/cn'
import { AnimatePresence, motion } from 'motion/react'

interface ToggleProps {
    checked?: boolean
    onChange?: (checked: boolean) => void
    children: React.ReactNode
    className?: string
    disabled?: boolean
}
type ToggleElement = React.ComponentRef<'button'>

const booleanize = (value?: unknown): boolean | 'unknown' => {
    if (typeof value === 'string') {
        if (value === 'true') return true
        if (value === 'false') return false
    }
    if (typeof value === 'boolean') return value
    return 'unknown'
}

// handle if controlled vs uncontrolled
const useControllableState = <T,>({
    prop,
    onChange,
    defaultValue,
}: {
    prop?: T
    onChange?: (value: T) => void
    defaultValue: T
}): [T, (value: T) => void] => {
    const [state, setState] = useState(defaultValue)
    const isControlled = prop !== undefined

    const setValue = (value: T) => {
        if (!isControlled) {
            setState(value)
        } else {
            if (onChange) {
                onChange(value)
            } else {
                console.warn(
                    'onChange prop is not provided for controlled component'
                )
            }
        }
    }

    return [isControlled ? prop : state, setValue]
}

const ToggableArea = forwardRef<ToggleElement, ToggleProps>(
    ({ children, checked, onChange, ...props }, ref) => {
        if (
            booleanize(checked) === 'unknown' &&
            typeof checked !== 'undefined'
        ) {
            throw new Error(
                'Invalid value for checked prop. Expected boolean or string "true" or "false".'
            )
        }

        const [isChecked, setChecked] = useControllableState({
            prop: checked,
            onChange: onChange,
            defaultValue: false,
        })
        return (
            <button
                ref={ref}
                type="button"
                {...props}
                data-checked={isChecked ? 'on' : 'off'}
                data-disabled={props.disabled ? 'true' : 'false'}
                className={cn(props.className)}
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

const Checkbox = ({ children }: ToggleProps) => {
    const ref = useRef<HTMLButtonElement>(null)
    const [isChecked, setChecked] = useState(false)
    return (
        <ToggableArea
            ref={ref}
            checked={isChecked}
            onChange={(checked) => {
                setChecked(checked)
            }}
            className='flex items-center gap-1 font-medium text-accent data-[checked="off"]:text-accent/40'
        >
            <AnimatePresence>
                <span
                    className={cn(
                        'flex items-center justify-center w-4 h-4 rounded-sm',
                        isChecked ? 'bg-accent' : 'bg-accent/40'
                    )}
                >
                    {isChecked && (
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
                    )}
                </span>
            </AnimatePresence>
            {children}
        </ToggableArea>
    )
}

export default Toggle
export { Checkbox }
