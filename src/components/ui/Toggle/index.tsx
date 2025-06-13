import React from 'react'
import cn from '../../../utils/cn'
import { AnimatePresence, motion } from 'motion/react'
import useControllableState from '../../utils/useControllableState'
import DataAttributeDecorator from '../../utils/DataAttributeDecorater'

export type ToggleBaseProps = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'onChange' | 'value' | 'children' | 'checked'
> & {
    checked?: boolean
    onChange?: (value: boolean) => void
    children: React.ReactNode | ((checked?: boolean) => React.ReactNode)
    ref?: React.RefObject<HTMLButtonElement>
}

const booleanize = (value?: unknown): boolean | 'unknown' => {
    if (typeof value === 'string') {
        if (value === 'true') return true
        if (value === 'false') return false
    }
    if (typeof value === 'boolean') return value
    return 'unknown'
}

export const TOGGLE_BASE = ({
    children,
    checked,
    onChange,
    ref,
    ...props
}: ToggleBaseProps) => {
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
            <DataAttributeDecorator checked={isChecked}>
                {typeof children === 'function'
                    ? children(isChecked)
                    : children}
            </DataAttributeDecorator>
        </button>
    )
}

TOGGLE_BASE.displayName = 'ToggleBase'

const Toggle = ({ children, ref, ...props }: ToggleBaseProps) => {
    return (
        <TOGGLE_BASE
            ref={ref}
            {...props}
            className={cn(
                'p-2 rounded-sm transition-colors duration-200 ease-in-out text-white',
                'data-[checked="on"]:bg-accent data-[checked="off"]:bg-accent/60',
                props.className
            )}
        >
            {children}
        </TOGGLE_BASE>
    )
}

Toggle.displayName = 'Toggle'

type CheckboxProps = {
    value?: string
    checked?: boolean
    onChange?: (value: string | boolean) => void
    children: React.ReactNode
    className?: string
    ref?: React.RefObject<HTMLButtonElement>
}

export type SharedMarkProps = {
    markClassName?: string
    markStyle?: React.CSSProperties
}

export const Checkbox = ({
    children,
    ref,
    ...props
}: CheckboxProps & SharedMarkProps) => {
    return (
        <TOGGLE_BASE
            className='flex items-center gap-1 font-medium text-accent data-[checked="off"]:text-accent/40 group'
            role="checkbox"
            ref={ref}
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
                                },
                                props.markClassName
                            )}
                            style={props.markStyle}
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
        </TOGGLE_BASE>
    )
}
Checkbox.displayName = 'Toggle.Checkbox'

export default Toggle
