import { useEffect } from 'react'

const useMouseLeave = ({
    ref,
    onClick,
    disabled = false,
}: {
    ref: React.RefObject<HTMLElement> | null
    onClick: () => void
    disabled?: boolean
}) => {
    useEffect(() => {
        const currentRef = ref?.current
        if (!currentRef || disabled) return
        const handleMouseLeave = (e: MouseEvent) => {
            if (!currentRef.contains(e.relatedTarget as Node)) {
                onClick()
            }
        }
        currentRef.addEventListener('mouseleave', handleMouseLeave)
        return () => {
            currentRef.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])
}

export default useMouseLeave
