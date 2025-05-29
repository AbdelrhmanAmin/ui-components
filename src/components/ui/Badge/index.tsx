import cn from '../../../utils/cn'

const Badge = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            {...props}
            className={cn(
                'bg-gray-600/50 text-white px-2 py-1 rounded-md',
                className
            )}
        >
            {children}
        </div>
    )
}

export default Badge
