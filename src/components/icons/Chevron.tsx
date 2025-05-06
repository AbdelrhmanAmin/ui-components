import cn from 'classnames'
const getSideTransform = (side: 'up' | 'down' | 'left' | 'right') => {
    switch (side) {
        case 'up':
            return 'rotate(180deg)'
        case 'left':
            return 'rotate(90deg)'
        case 'right':
            return 'rotate(270deg)'
        default:
            return 'rotate(0deg)'
    }
}
const Chevron = (
    props: React.SVGProps<SVGSVGElement> & {
        side?: 'up' | 'down' | 'left' | 'right'
    }
) => {
    const { side = 'down', ...rest } = props

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
            className={cn(
                'h-4 w-4 shrink-0 transition-transform duration-200',
                props.className
            )}
            style={{
                ...props.style,
                transform: getSideTransform(side),
            }}
        >
            <path
                d="M7 10l5 5 5-5H7z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
export default Chevron
