import React, { createContext, useContext, useEffect, useState } from 'react';

type API = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const DropdownCtx = createContext<API>({
    isOpen: false,
    setIsOpen: () => {},
});

const Dropdown = ({
    children,
    isOpenByDefault,
}: {
    children: React.ReactNode;
    isOpenByDefault?: boolean;
}) => {
    const [open, setOpen] = useState(isOpenByDefault || false);
    return (
        <DropdownCtx.Provider
            value={{
                isOpen: open,
                setIsOpen: setOpen,
            }}
        >
            <div className="relative">{children}</div>
        </DropdownCtx.Provider>
    );
};

const DropDownTrigger = ({
    children,
}: {
    children: React.ReactNode | ((props: Partial<API>) => React.ReactNode);
}) => {
    const { isOpen, setIsOpen } = useContext(DropdownCtx);
    if (typeof children === 'function') {
        return children({ isOpen, setIsOpen });
    }
    if (!React.isValidElement(children)) {
        if (typeof children === 'string') {
            return (
                <div role="button" onClick={() => setIsOpen(!isOpen)}>
                    {children}
                </div>
            );
        }
        throw new Error(
            `Children must be a valid React element...type is ${typeof children}`
        );
    }
    return React.cloneElement(children as React.ReactElement, {
        onClick: () => setIsOpen(!isOpen),
    });
};

export type PositionY = 'top' | 'bottom';
export type PositionX = 'left' | 'right';

const DropDownContent = ({
    children,
    positionX = 'left',
    positionY = 'bottom',
}: {
    children: React.ReactNode | ((props: Partial<API>) => React.ReactNode);
    positionX?: PositionX;
    positionY?: PositionY;
}) => {
    const { isOpen, setIsOpen } = useContext(DropdownCtx);
    const ref = React.useRef<HTMLDivElement>(null);

    if (!isOpen) return null;

    const Wrapper = ({ children }: { children: React.ReactNode }) => {
        const stylePosition = handlePosition(positionX, positionY);
        // handle click outside
        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (ref.current && !ref.current.contains(e.target as Node)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);
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
    return (
        <Wrapper>
            {typeof children === 'function' ? children({ isOpen }) : children}
        </Wrapper>
    );
};

Dropdown.Trigger = DropDownTrigger;
Dropdown.Content = DropDownContent;
export default Dropdown;

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
