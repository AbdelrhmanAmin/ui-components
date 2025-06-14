import { AnimatePresence, motion } from 'motion/react'
import React, { createContext, useContext, useMemo, useState } from 'react'
import cn from '../../../utils/cn'
import useControllableState from '../../utils/useControllableState'
import { IsSelectTypeControlled } from '../../types'
import comparison, { findInArray } from '../../utils/comparison'

interface CommandContext<T> {
    search: string
    setSearch: (search: string) => void
    picks: T | T[]
    select: (value: T) => void
    type: 'single' | 'multiple'
    findIsActive: (pick: T) => boolean
    disabled: boolean
}

const CommandCtx = createContext<CommandContext<any>>({
    search: '',
    setSearch: () => {},
    picks: [],
    select: () => {},
    type: 'multiple',
    findIsActive: () => false,
    disabled: false,
})

const Command = <T,>({
    children,
    onChange,
    value,
    defaultValue,
    type = 'single',
    disabled = false,
}: {
    children: React.ReactNode
    disabled?: boolean
} & IsSelectTypeControlled<T>) => {
    const [search, setSearch] = useState('')
    const [picks, submit] = useControllableState<T[]>({
        value,
        defaultValue: defaultValue,
        onChange,
    })
    const findIsActive = (pick: T) => {
        if (!picks || (Array.isArray(picks) && picks.length === 0)) return false

        return findInArray(picks, pick)
    }
    const select = (pick: T) => {
        const toRemove = findIsActive(pick)
        // setup the value
        if (!picks) {
            return submit([pick])
        }
        if (type === 'single') {
            if (toRemove) {
                submit([])
            } else {
                submit([pick])
            }
        } else {
            if (Array.isArray(picks)) {
                if (toRemove) {
                    submit(picks.filter((item) => !comparison(item, pick)))
                } else {
                    submit([...picks, pick])
                }
            }
        }
    }
    return (
        <CommandCtx.Provider
            value={{
                search,
                setSearch,
                picks,
                select,
                type,
                findIsActive,
                disabled,
            }}
        >
            {children}
        </CommandCtx.Provider>
    )
}

const CommandInput = (
    inputProps: React.InputHTMLAttributes<HTMLInputElement>
) => {
    const { search, setSearch, disabled } = useContext(CommandCtx)
    return (
        <input
            {...inputProps}
            value={search}
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
            className={cn(
                'min-w-[280px] w-full p-2 rounded-md rounded-b-none border-b border-border bg-background focus:outline-none',
                (inputProps.disabled || disabled) &&
                    'opacity-50 pointer-events-none'
            )}
        />
    )
}

const findMatchings = (
    children: JSX.Element[],
    search: string
): JSX.Element[] => {
    return children.filter((child) => {
        if (child.type.displayName === CommandItem.displayName) {
            const keyword = findKeyword(
                React.Children.toArray(
                    child.props.children
                ) as React.ReactNode[]
            )
            if (keyword.toLowerCase().includes(search.toLowerCase())) {
                return child
            }
        }
        return false
    })
}

const CommandGroup = ({
    children,
    ...props
}: { children: JSX.Element[] } & React.HTMLAttributes<HTMLUListElement>) => {
    const { search, disabled } = useContext(CommandCtx)
    const initialChildren = useMemo(() => {
        return React.Children.toArray(children) as JSX.Element[]
    }, [])
    // traverse and nest the children till you find the command item
    const filteredChildren = useMemo(() => {
        if (!search) return initialChildren
        const matchings = findMatchings(initialChildren, search)
        if (matchings.length === 0) return 'No results found...'
        return matchings
    }, [search])
    return (
        <ul
            {...props}
            className={cn(
                'dropdown',
                props.className,
                disabled && 'opacity-50 pointer-events-none'
            )}
        >
            {filteredChildren}
        </ul>
    )
}

const findKeyword = (children: React.ReactNode[]): string => {
    for (const child of children) {
        if (React.isValidElement(child)) {
            const childValue = child.props.children
            if (child.props.value) {
                return child.props.value
            } else if (typeof childValue === 'string') {
                return childValue
            } else if (Array.isArray(childValue)) {
                const found = findKeyword(
                    React.Children.toArray(childValue) as React.ReactNode[]
                )
                if (found) return found
            }
        } else {
            if (typeof child === 'string') {
                return child
            }
        }
    }
    return ''
}

const CommandItem = ({
    children,
    className,
    value,
    ...props
}: React.LiHTMLAttributes<HTMLLIElement> & {
    value: string
}) => {
    value = value.toString()
    const { select, findIsActive, disabled } = useContext(CommandCtx)
    const isActive = findIsActive(value)
    return (
        <li
            {...props}
            className={cn(
                'item flex items-center',
                'cursor-pointer',
                className,
                disabled && 'opacity-50 pointer-events-none'
            )}
            onClick={() => select(value)}
            data-checked={isActive ? 'on' : 'off'}
            data-value={value}
        >
            {children}
            <AnimatePresence>
                {isActive && (
                    <motion.span
                        className="text-white ml-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <svg
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            width={16}
                            height={16}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M18.047,4,22,8.325,9.3,20,2,12.68,6.136,8.533,9.474,11.88Z" />
                        </svg>
                    </motion.span>
                )}
            </AnimatePresence>
        </li>
    )
}

CommandItem.displayName = 'CommandItem'

Command.Input = CommandInput
Command.Group = CommandGroup
Command.Item = CommandItem

export default Command
