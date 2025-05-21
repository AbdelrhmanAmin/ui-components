import { useState } from 'react'

interface UseControllableStateI<T> {
    value?: T
    defaultValue?: T
    onChange?: (value: T) => void
}

const useControllableState = <T,>({
    value,
    defaultValue,
    onChange,
}: UseControllableStateI<T>) => {
    const [state, setState] = useState<T | undefined>(defaultValue)

    const isControlled = value !== undefined

    const handleChange = (newValue: T) => {
        if (onChange) {
            // maybe they want to access the onChange event without controlling the component.
            onChange(newValue)
        }
        if (!isControlled) {
            return setState(newValue)
        } else if (!onChange) {
            console.warn(
                'Warning: You are using a controlled component without an onChange handler. Please provide an onChange handler to update the state.'
            )
        }
    }

    return [isControlled ? value : state, handleChange] as const
}

export default useControllableState
