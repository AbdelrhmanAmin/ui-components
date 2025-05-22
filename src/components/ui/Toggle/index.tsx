import React, { forwardRef } from 'react'
import cn from '../../../utils/cn'
import { AnimatePresence, motion } from 'motion/react'
import useControllableState from '../../utils/useControllableState'

type BasicProps = {
    value?: string
    checked?: boolean
    onChange?: (value: string | boolean) => void
    children: React.ReactNode
    className?: string
}
type ToggleElement = React.ComponentRef<'button'>

export type ToggleBaseProps = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'onChange' | 'value' | 'children' | 'checked'
> & {
    value?: string
    checked?: boolean
    onChange?: (value: string | boolean) => void
    children: React.ReactNode | ((checked?: boolean) => React.ReactNode)
}

const booleanize = (value?: unknown): boolean | 'unknown' => {
    if (typeof value === 'string') {
        if (value === 'true') return true
        if (value === 'false') return false
    }
    if (typeof value === 'boolean') return value
    return 'unknown'
}

const ToggleBase = forwardRef<ToggleElement, ToggleBaseProps>(
    ({ children, checked, onChange, ...props }, ref) => {
        const [isChecked, onActive] = useControllableState({
            value: checked,
            onChange,
            defaultValue: false,
        })
        return (
            <button
                role="toggle"
                {...props}
                ref={ref}
                type="button"
                value={props.value}
                data-checked={booleanize(isChecked) === true ? 'on' : 'off'}
                data-disabled={props.disabled ? 'true' : 'false'}
                onClick={() => {
                    onActive(!isChecked)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onActive(!isChecked)
                    }
                }}
            >
                {typeof children === 'function'
                    ? children(isChecked)
                    : children}
            </button>
        )
    }
)

ToggleBase.displayName = 'ToggleBase'

const Toggle = forwardRef<ToggleElement, ToggleBaseProps>(
    ({ children, ...props }, ref) => {
        return (
            <ToggleBase
                ref={ref}
                {...props}
                className={cn(
                    'p-2 rounded-sm transition-colors duration-200 ease-in-out text-white',
                    'data-[checked="on"]:bg-accent data-[checked="off"]:bg-accent/60',
                    props.className
                )}
            >
                {children}
            </ToggleBase>
        )
    }
)

Toggle.displayName = 'Toggle'

export const Checkbox = ({ children, ...props }: BasicProps) => {
    return (
        <ToggleBase
            className='flex items-center gap-1 font-medium text-accent data-[checked="off"]:text-accent/40 group'
            role="checkbox"
            {...props}
        >
            {(checked) => (
                <>
                    <AnimatePresence>
                        <span
                            className={cn(
                                'flex items-center justify-center w-4 h-4 rounded-sm',
                                {
                                    'bg-accent': checked,
                                    'bg-accent/40': !checked,
                                }
                            )}
                        >
                            {checked && (
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
                </>
            )}
        </ToggleBase>
    )
}
Checkbox.displayName = 'Toggle.Checkbox'
export const Radio = ({ children, ...props }: BasicProps) => {
    return (
        <ToggleBase
            {...props}
            className={cn(
                'flex items-center gap-1 font-medium text-accent data-[checked="off"]:text-accent/40',
                props.className
            )}
            role="radio"
        >
            <span
                className={cn(
                    'flex items-center justify-center w-4 h-4 rounded-full transition-colors',
                    {
                        'bg-accent': props.checked,
                        'bg-accent/40': !props.checked,
                    }
                )}
            >
                <AnimatePresence>
                    {props.checked && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.1 }}
                            className="w-2 h-2 bg-muted rounded-full"
                        />
                    )}
                </AnimatePresence>
            </span>

            {children}
        </ToggleBase>
    )
}
Radio.displayName = 'Toggle.Radio'

export default Toggle
