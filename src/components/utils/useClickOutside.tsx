import { useEffect, useRef } from 'react'

const useClickOutside = (setOpen: Function) => {
    const ref = useRef<HTMLDivElement>(null)
    const handleClickOutside = (e: MouseEvent) => {
        const isContained = ref.current?.contains(e.target as Node)
        if (ref.current && !isContained) {
            setOpen(false)
        }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
    return { ref }
}

export default useClickOutside
