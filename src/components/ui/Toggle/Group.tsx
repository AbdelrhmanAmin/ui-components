import React, { useState } from 'react'

const ToggleGroup = ({
    children,
    type,
}: {
    children: Array<React.ReactElement<{ value: string }>>
    type: 'single' | 'multiple'
}) => {
    const [value, setValue] = useState<string[]>([])

    const handleToggle = (val: string) => {
        if (type === 'single') {
            setValue([val])
        } else {
            setValue((prev) =>
                prev.includes(val)
                    ? prev.filter((v) => v !== val)
                    : [...prev, val]
            )
        }
    }

    return (
        <div role="group" aria-label="Toggle Group">
            {React.Children.map(children, (child) => {
                // I want to check if it has a displayName of Toggle
                if (React.isValidElement(child)) {
                    const c = child as JSX.Element
                    const childProps = c.props
                    const isToggle = c.type.displayName === 'Toggle'
                    if (isToggle) {
                        if (childProps.value === undefined) {
                            throw new Error(
                                'ToggleGroup: Toggle must have a value prop'
                            )
                        }
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        return React.cloneElement(child, {
                            ...childProps,
                            checked: !!(
                                typeof childProps.value === 'string' &&
                                value.includes(childProps.value as string)
                            ),
                            onChange: handleToggle,
                            disabled:
                                childProps.disabled ||
                                childProps.value === undefined,
                        })
                    }
                }
                return child
            })}
        </div>
    )
}

ToggleGroup.displayName = 'ToggleGroup'
export default ToggleGroup
