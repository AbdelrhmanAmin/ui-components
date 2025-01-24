import cn from 'classnames'
import { FC, useState } from 'react'
import createRippleImpl from '../createRipple'

type ButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    isLoading?: boolean
}

const Loader = ({
    children,
    isLoading,
}: {
    children: React.ReactNode
    isLoading?: boolean
}) => {
    if (isLoading === undefined) return children
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
                    'opacity-0': !isLoading,
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
    )
}

const createRippleButton = createRippleImpl({
    isCentered: false,
})

const Button: FC<ButtonProps> = ({ children, isLoading, ...props }) => {
    const baseStyle = cn(
        'p-2 bg-gray-500 text-white rounded-md overflow-hidden relative flex items-center justify-center',
        props.className
    )
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        createRippleButton(e)
        props.onClick?.(e)
    }
    return (
        <button {...props} onClick={onClick} className={baseStyle}>
            <Loader isLoading={isLoading}>{children}</Loader>
        </button>
    )
}

export default Button
