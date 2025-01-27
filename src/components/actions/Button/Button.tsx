import cn from 'classnames';
import { FC, useMemo } from 'react';
import createRippleImpl, { RippleConfig } from '../../createRipple';

type ButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    isLoading?: boolean;
    rippleConfig?: Partial<RippleConfig>;
    disabled?: boolean;
};

const Loader = ({
    children,
    isLoading,
}: {
    children: React.ReactNode;
    isLoading?: boolean;
}) => {
    if (isLoading === undefined) return children;
    return (
        <>
            <div
                className={cn({
                    'opacity-0': isLoading,
                })}
            >
                {children}
            </div>
            <span
                className={cn('absolute animate-spin h-5 w-5 ', {
                    hidden: !isLoading,
                })}
            >
                <svg
                    className="text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.003 8.003 0 014 12H0c0 6.627 5.373 12 12 12v-4z"
                    ></path>
                </svg>
            </span>
        </>
    );
};

const baseStyle = cn(
    'flex items-center justify-center',
    'overflow-hidden relative',
    'border-2 p-2 rounded-md font-medium',
    'active:contrast-150 transition-all'
);

const Button: FC<ButtonProps> = ({
    children,
    isLoading,
    rippleConfig,
    ...props
}) => {
    const ripple = useMemo(
        () => createRippleImpl(rippleConfig),
        [rippleConfig]
    );
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        ripple(e);
        props.onClick?.(e);
    };
    return (
        <button
            {...props}
            onClick={onClick}
            className={cn(baseStyle, props.className, {
                'pointer-events-none opacity-60': props.disabled,
            })}
            style={{
                borderColor:
                    'color-mix(in srgb, currentColor 60%, transparent)',
            }}
        >
            <Loader isLoading={isLoading}>{children}</Loader>
        </button>
    );
};

export default Button;
