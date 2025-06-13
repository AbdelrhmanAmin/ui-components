import cn from '../../../utils/cn'
import Panel, { Position } from '../Panel'

const Arrow = ({ position }: { position: Position }) => {
    return (
        <div
            className={cn(
                'absolute w-2 h-2 bg-background border-border border-r-0 border-b-0 rotate-45',
                position === 'bottom' && '-top-1',
                position === 'top' && '-bottom-1',
                position === 'left' && '-right-1 top-1/2 -translate-y-1/2',
                position === 'right' && '-left-1 top-1/2 -translate-y-1/2'
            )}
        />
    )
}

const Tooltip = ({
    children,
    content,
    position = 'right',
}: {
    children: React.ReactNode
    content: React.ReactNode
    position?: Position
}) => {
    return (
        <Panel className="relative">
            <Panel.Trigger isHoverable>{children}</Panel.Trigger>
            <Panel.Content
                className={cn(
                    'bg-background flex flex-col items-center whitespace-nowrap',
                    'p-2 rounded-md'
                )}
                position={position}
                gutter={10}
            >
                <Arrow position={position} />
                {content}
            </Panel.Content>
        </Panel>
    )
}

export default Tooltip
