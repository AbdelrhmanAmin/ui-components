import React, { createContext, useState } from 'react'
import Toggle, { ToggleBaseProps } from '.'

type ToggleOptionProps = Omit<ToggleBaseProps, 'value' | 'children'> & {
    children: React.ReactNode
    value: string
}

const ToggleOption = (props: ToggleOptionProps) => {
    const GroupScope = React.useContext(CTX)
    if (!GroupScope) {
        throw new Error('ToggleOption must be used within a ToggleGroup')
    }
    const { value, onChange } = GroupScope
    const isChecked = value?.includes(props.value)
    return (
        <Toggle
            {...props}
            checked={isChecked}
            onChange={() => {
                onChange(props.value)
            }}
        />
    )
}

const CTX = createContext<
    { value: string[]; onChange: (val: string) => void } | undefined
>(undefined)

const Group = ({
    children,
    type,
    ...props
}: React.ComponentProps<'div'> & {
    type: 'single' | 'multiple'
}) => {
    const [value, setValue] = useState<string[]>([])

    const handleToggle = (val: string) => {
        if (type === 'single') {
            setValue([val])
        } else {
            setValue((prev) => {
                if (prev.includes(val)) {
                    console.log('removing', val, 'from', prev)
                    return prev.filter((v) => v !== val)
                } else {
                    return [...prev, val]
                }
            })
        }
    }
    const context = { value, onChange: handleToggle }
    return (
        <CTX.Provider value={context}>
            <div {...props} role="group">
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        if (child.props && 'value' in child.props) {
                            const c = child as JSX.Element
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                            return React.cloneElement(c, {
                                ...c.props,
                                checked: !!(
                                    typeof c.props.value === 'string' &&
                                    value.includes(c.props.value as string)
                                ),
                                onChange: () => handleToggle(c.props.value as string),
                            })
                        }
                    }
                    return child
                })}
            </div>
        </CTX.Provider>
    )
}

Group.displayName = 'ToggleGroup'

Group.Option = ToggleOption
export default Group
