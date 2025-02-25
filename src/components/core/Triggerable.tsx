import React, { createContext, useContext, useEffect, useState } from 'react';

type API = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

type TriggerableChildren = [
    JSX.Element & { type: { displayName: 'Triggerable.Trigger' } },
    JSX.Element & { type: { displayName: 'Triggerable.Content' } },
];
const createTriggerable = (displayName: string) => {
    const CTX = createContext<API>({
        isOpen: false,
        setIsOpen: () => {},
    });

    const Trigger = ({
        children,
    }: {
        children: React.ReactNode | ((props: Partial<API>) => React.ReactNode);
    }) => {
        const { isOpen, setIsOpen } = useContext(CTX);
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
    Trigger.displayName = `Triggerable.Trigger`;

    const Root = ({
        children,
        isOpenByDefault,
    }: {
        children: TriggerableChildren;
        isOpenByDefault?: boolean;
    }) => {
        const ref = React.useRef<HTMLDivElement>(null);
        const [open, setOpen] = useState(isOpenByDefault || false);

        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (ref.current && !ref.current.contains(e.target as Node)) {
                    setOpen(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);
        return (
            <CTX.Provider
                value={{
                    isOpen: open,
                    setIsOpen: setOpen,
                }}
            >
                <div className="relative">{children}</div>
            </CTX.Provider>
        );
    };

    const useTrigger = () => {
        if (!useContext(CTX))
            throw new Error(
                'useTrigger must be used within a Triggerable component'
            );
        return useContext(CTX);
    };
    Root.displayName = displayName;

    const createRoot = ({
        Trigger,
        Content,
    }: {
        Trigger: React.FC<any>;
        Content: React.FC<any>;
    }) => {
        const Triggerable = Object.assign(Root, { Trigger, Content });
        return Triggerable;
    };

    return { createRoot, Trigger, useTrigger };
};

export default createTriggerable;
