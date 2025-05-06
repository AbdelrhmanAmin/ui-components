import { AnimatePresence, motion } from 'motion/react'
import React, { createContext, useContext, useMemo, useState } from 'react'
import cn from '../../../utils/cn'

const CommandCtx = createContext({
    search: '',
    setSearch: (search: string) => {},
    value: '',
    setValue: (value: string) => {},
})
const Command = ({ children }: { children: React.ReactNode }) => {
    const [search, setSearch] = useState('')
    const [value, setValue] = useState('')
    return (
        <CommandCtx.Provider value={{ search, setSearch, value, setValue }}>
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
            const value = child.props.children
            if (typeof value === 'string') {
                return value.toLowerCase().includes(search?.toLowerCase())
            }
            return findMatchings(
                React.Children.toArray(value) as JSX.Element[],
                search
            )
        }
        return false
    })
}

const CommandGroup = ({ children }: { children: JSX.Element[] }) => {
    const { search } = useContext(CommandCtx)
    // traverse and nest the children till you find the command item
    const filteredChildren = useMemo(() => {
        if (!search) return children
        const matchings = findMatchings(
            React.Children.toArray(children) as JSX.Element[],
            search
        )
        if (matchings.length === 0) return 'No results found...'
        return matchings
    }, [search])
    return <ul className="p-2">{filteredChildren}</ul>
}

const CommandItem = ({
    children,
    className,
    ...props
}: React.LiHTMLAttributes<HTMLLIElement>) => {
    const { value, setValue } = useContext(CommandCtx)
    const itemValue = children?.toString()
    const isActive = value ? itemValue?.toString().includes(value) : false
    return (
        <li
            {...props}
            className={cn(
                'p-2 bg-black hover:bg-muted/20 rounded-md transition-colors flex justify-between items-center',
                'cursor-pointer',
                className
            )}
            onClick={() => {
                if (itemValue) {
                    if (itemValue === value) return setValue('')
                    setValue(itemValue)
                }
            }}
        >
            {children}
            <AnimatePresence>
                {isActive && (
                    <motion.span
                        className="text-white"
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
