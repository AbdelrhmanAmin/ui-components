import { useState } from 'react'

interface UseControllableStateI<T> {
    value: T | undefined
    defaultValue?: T
    onChange?: (value: T) => void
}

const useControllableState = <T,>({
    value,
    defaultValue,
    onChange,
}: UseControllableStateI<T>) => {
    const [internalValue, setInternalValue] = useState(defaultValue as T)
    const isControlled = value !== undefined
    const handleChange = (newValue: T) => {
        if (onChange) {
            onChange(newValue)
        }
        if (!isControlled) {
            setInternalValue(newValue)
        }
        if (!onChange) {
            console.warn(
                'Warning: You are using a controlled component without an onChange handler. Please provide an onChange handler to update the state.'
            )
        }
    }
    return [isControlled ? value : internalValue, handleChange] as const
}

export default useControllableState
