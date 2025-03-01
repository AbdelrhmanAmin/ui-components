import React from 'react';
import createTriggerable from '../../core/Triggerable';
import cn from 'classnames';
import Button from '../Button';

export type PositionY = 'top' | 'bottom';
export type PositionX = 'left' | 'right';

const { createRoot, Trigger, useTrigger } = createTriggerable('Dropdown');

const DropDownTrigger = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const { isOpen } = useTrigger();
    return (
        <Trigger>
            <Button
                className={cn(
                    'inline-flex items-center gap-2 cursor-pointer',
                    'p-2 bg-gray-600 text-white font-medium rounded-md',
                    className
                )}
            >
                {children}
                <span>
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className={cn('h-6 w-6 transition-transform', {
                            'rotate-180': isOpen,
                        })}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </span>
            </Button>
        </Trigger>
    );
};

const DropDownContent = ({
    children,
    positionX = 'left',
    positionY = 'bottom',
}: {
    children: React.ReactNode;
    positionX?: PositionX;
    positionY?: PositionY;
}) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const { isOpen } = useTrigger();
    if (!isOpen) return null;
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
        const stylePosition = handlePosition(positionX, positionY);
        return (
            <div
                ref={ref}
                style={{
                    position: 'absolute',
                    ...stylePosition,
                }}
            >
                {children}
            </div>
        );
    };
    return <Wrapper>{children}</Wrapper>;
};

const handlePosition = (x: PositionX, y: PositionY) => {
    const position = {};
    if (x === 'left') {
        Object.assign(position, { left: '0' });
    } else if (x === 'right') {
        Object.assign(position, { right: '0' });
    }
    if (y === 'top') {
        Object.assign(position, { bottom: '100%' });
    } else if (y === 'bottom') {
        Object.assign(position, { top: '100%' });
    }
    return position;
};

const DropDown = createRoot({
    Trigger: DropDownTrigger,
    Content: DropDownContent,
});

export default DropDown;
