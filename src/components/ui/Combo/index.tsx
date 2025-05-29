import { AnimatePresence, motion } from 'motion/react'
import React, { createContext, useContext, useMemo, useState } from 'react'
import cn from '../../../utils/cn'
import useControllableState from '../../utils/useControllableState'
import { PropsMappedByType } from '../../types'

interface CommandContext {
    search: string
    setSearch: (search: string) => void
    value: string | string[]
    setValue: (value: string | string[]) => void
    type: 'single' | 'multiple'
}

const CommandCtx = createContext<CommandContext>({
    search: '',
    setSearch: () => {},
    value: '',
    setValue: () => {},
    type: 'single',
})

const Command = ({
    children,
    onChange,
    value,
    defaultValue,
    type = 'single',
}: {
    children: React.ReactNode
} & PropsMappedByType) => {
    const [search, setSearch] = useState('')
    const [internalValue, submit] = useControllableState<string | string[]>({
        value,
        defaultValue,
        onChange,
    })
    return (
        <CommandCtx.Provider
            value={{
                search,
                setSearch,
                value: internalValue,
                setValue: submit,
                type,
            }}
        >
            {children}
        </CommandCtx.Provider>
    )
}

const CommandInput = (
    inputProps: React.InputHTMLAttributes<HTMLInputElement>
) => {
    const { search, setSearch } = useContext(CommandCtx)
    return (
        <input
            {...inputProps}
            value={search}
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[280px] w-full p-2 rounded-md rounded-b-none border-b border-border bg-background focus:outline-none"
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

const CommandGroup = ({ children }: { children: JSX.Element[] }) => {
    const { search } = useContext(CommandCtx)
    const initialChildren = useMemo(() => {
        return React.Children.toArray(children) as JSX.Element[]
    }, [])
    // traverse and nest the children till you find the command item
    const filteredChildren = useMemo(() => {
        if (!search) return initialChildren
        const matchings = findMatchings(
            initialChildren as JSX.Element[],
            search
        )
        if (matchings.length === 0) return 'No results found...'
        return matchings
    }, [search])
    return <ul className="dropdown">{filteredChildren}</ul>
}

const findKeyword = (children: React.ReactNode[]): string => {
    for (const child of children) {
        if (React.isValidElement(child)) {
            const childValue = child.props.children
            if (typeof childValue === 'string') {
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
    ...props
}: React.LiHTMLAttributes<HTMLLIElement>) => {
    const { value, setValue, type } = useContext(CommandCtx)
    const keyword = useMemo(() => {
        const itemValueArray = React.Children.toArray(children)
        const found = findKeyword(itemValueArray)
        return found
    }, [])
    const isActive =
        (keyword === value && type === 'single') ||
        (Array.isArray(value) && value.includes(keyword))
    return (
        <li
            {...props}
            className={cn(
                'item flex items-center',
                'cursor-pointer',
                className
            )}
            onClick={() => {
                if (type === 'single') {
                    if (keyword === value) setValue('')
                    else setValue(keyword as string)
                } else {
                    if (Array.isArray(value)) {
                        if (value.includes(keyword as string)) {
                            setValue(value.filter((item) => item !== keyword))
                        } else {
                            setValue([...value, keyword as string])
                        }
                    } else {
                        setValue([keyword as string])
                    }
                }
            }}
            data-checked={isActive ? 'on' : 'off'}
            aria-keyword={keyword}
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
