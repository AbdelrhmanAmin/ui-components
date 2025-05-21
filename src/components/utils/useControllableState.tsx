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
        if (!isControlled) {
            return setState(newValue)
        }
        if (onChange) {
            return onChange(newValue)
        } else {
            console.warn(
                'Uncontrolled component, please provide an onChange handler'
            )
        }
    }

    return [isControlled ? value : state, handleChange] as const
}

export default useControllableState
