import { useEffect, useRef } from 'react'

const useClickOutside = (
    setOpen: (state: boolean) => void,
    ref?: React.RefObject<HTMLDivElement>
) => {
    const internalRef = useRef<HTMLDivElement>(null)
    const targetRef = ref || internalRef
    const handleClickOutside = (e: MouseEvent) => {
        const isContained = targetRef.current?.contains(e.target as Node)
        if (targetRef.current && !isContained) {
            setOpen(false)
        }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setOpen(false)
        }
    }
    useEffect(() => {
        const ctrl = new AbortController()

        document.addEventListener('keydown', handleKeyDown, {
            signal: ctrl.signal,
        })
        document.addEventListener('mousedown', handleClickOutside, {
            signal: ctrl.signal,
        })
        return () => ctrl.abort()
    }, [])
    return { ref: targetRef }
}

export default useClickOutside
