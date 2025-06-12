import Toggle, { ToggleBaseProps } from '.'
import cn from '../../../utils/cn'

const Switch = ({
    className,
    markClassName,
    ...props
}: Omit<ToggleBaseProps, 'children'> & { markClassName?: string }) => {
    return (
        <Toggle
            className={cn(
                'w-8 flex items-center h-5 rounded-full p-0',
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    'w-4 h-4 bg-white rounded-full transition-all',
                    'data-[checked=on]:translate-x-3.5',
                    'data-[checked=off]:translate-x-0.5',
                    markClassName
                )}
            />
        </Toggle>
    )
}

export default Switch
