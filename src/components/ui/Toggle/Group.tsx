import React, { createContext } from 'react'
import Toggle, { SharedMarkProps, TOGGLE_BASE, ToggleBaseProps } from '.'
import { motion } from 'motion/react'
import { AnimatePresence } from 'motion/react'
import cn from '../../../utils/cn'
import useControllableState from '../../utils/useControllableState'
import { PropsMappedByType } from '../../types'

type ToggleOptionProps = Omit<ToggleBaseProps, 'children' | 'onChange'> & {
    children: React.ReactNode
    value: string
    ref?: React.RefObject<HTMLButtonElement>
}

const useMergeGroupProps = <T extends ToggleOptionProps>(props: T) => {
    const GroupScope = React.useContext(CTX)
    if (!GroupScope) {
        throw new Error('ToggleOption must be used within a ToggleGroup')
    }
    const { value, onChange } = GroupScope
    const isChecked = value?.includes(props.value)
    return {
        ...props,
        checked: isChecked,
        onChange: () => onChange(props.value),
    }
}

const ToggleOption = (props: ToggleOptionProps) => {
    const args = useMergeGroupProps(props)
    return <Toggle {...args} />
}

const Radio = (props: ToggleOptionProps & SharedMarkProps) => {
    const { children, markClassName, markStyle, ...args } = useMergeGroupProps(props)
    return (
        <TOGGLE_BASE
            {...args}
            className={cn(
                'flex items-center gap-1 font-medium text-accent data-[checked="off"]:text-accent/40',
                args.className
            )}
            role="radio"
        >
            <span
                className={cn(
                    'flex items-center justify-center w-4 h-4 rounded-full transition-colors border-2 border-accent bg-white/10'
                )}
            >
                <AnimatePresence>
                    {args.checked && (
                        <motion.span
                            className={cn(
                                'w-2 h-2 bg-accent rounded-full',
                                markClassName
                            )}
                            style={markStyle}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.1 }}
                        />
                    )}
                </AnimatePresence>
            </span>

            {children}
        </TOGGLE_BASE>
    )
}
Radio.displayName = 'Toggle.Radio'

type GroupContextReturn = {
    value: string | string[]
    onChange: (val: string) => void
}

const CTX = createContext<GroupContextReturn | undefined>(undefined)


const Group = ({
    children,
    type = 'single',
    onChange,
    ...props
}: Omit<React.ComponentProps<'div'>, 'onChange' | 'value' | 'defaultValue'> &
    PropsMappedByType) => {
    const [picks, setPicks] = useControllableState<string | string[]>({
        value: props.value,
        defaultValue: props.defaultValue || '',
        onChange: onChange,
    })

    const handleToggle = (newPick: string) => {
        if (type === 'single') {
            setPicks(newPick as string)
        } else {
            if (!picks || !Array.isArray(picks)) void setPicks([newPick])
            if (Array.isArray(picks)) {
                if (picks.includes(newPick)) {
                    void setPicks(picks.filter((pick) => pick !== newPick))
                } else {
                    void setPicks([...picks, newPick])
                }
            }
        }
    }

    const context: GroupContextReturn = { value: picks, onChange: handleToggle }
    return (
        <CTX.Provider value={context}>
            <div {...props} role="group">
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.props?.value) {
                        return React.cloneElement(child, {
                            ...child.props,
                            checked:
                                typeof child.props.value === 'string' &&
                                picks?.includes(child.props.value),
                            onChange: () => handleToggle(child.props.value),
                        })
                    }
                    return child
                })}
            </div>
        </CTX.Provider>
    )
}

Group.displayName = 'ToggleGroup'

Group.Toggle = ToggleOption
Group.Radio = Radio
export default Group
