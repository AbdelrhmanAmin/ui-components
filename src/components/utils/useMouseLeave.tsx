import { useEffect } from 'react'

const useMouseLeave = ({
    ref,
    setOpen,
    disabled = false,
}: {
    ref: React.RefObject<HTMLElement> | null
    setOpen: Function
    disabled?: boolean
}) => {
    useEffect(() => {
        const currentRef = ref?.current
        if (!currentRef || disabled) return
        const handleMouseLeave = (e: MouseEvent) => {
            if (!currentRef.contains(e.relatedTarget as Node)) {
                setOpen(false)
            }
        }
        currentRef.addEventListener('mouseleave', handleMouseLeave)
        return () => {
            currentRef.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])
}

export default useMouseLeave
