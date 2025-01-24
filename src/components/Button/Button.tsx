import cn from 'classnames'
import { FC } from 'react'

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
        <div className="flex items-center justify-center relative w-full h-full">
            <div
                className={
                    'absolute left-2 w-4 h-4 border-2 border-t-white rounded-full animate-spin'
                }
            />
            {children}
        </div>
    )
}

const rippleID = 'ripple-container'

const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    let rippleElement = target.querySelector(`#${rippleID}`) as HTMLElement
    if (!rippleElement) {
        const buttonWidth = target.offsetWidth
        const buttonHeight = target.offsetHeight
        const containerAroundButton = Object.assign(
            document.createElement('div'),
            {
                style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: buttonWidth + 'px',
                    height: buttonHeight + 'px',
                },
            }
        )
        containerAroundButton.id = rippleID
        target.appendChild(containerAroundButton)
        rippleElement = containerAroundButton
    }
    console.log({ rippleElement })
    // requestAnimationFrame(() => {
    //     const ripple = Object.assign(document.createElement('div'), {
    //         style: {
    //             position: 'absolute',
    //             top: y + 'px',
    //             left: x + 'px',
    //             width: '0',
    //             height: '0',
    //             background: 'rgba(255, 255, 255, 0.3)',
    //             borderRadius: '50%',
    //             transform: 'translate(-50%, -50%)',
    //             transition: 'width 0.5s, height 0.5s',
    //         },
    //     })
    //     containerAroundButton.appendChild(ripple)
    //     const size = Math.max(buttonWidth, buttonHeight) * 2
    //     ripple.style.width = size + 'px'
    //     ripple.style.height = size + 'px'
    //     ripple.style.opacity = '0'
    //     ripple.style.transition = 'width 0.5s, height 0.5s, opacity 0.5s'
    //     setTimeout(() => {
    //         containerAroundButton.remove()
    //     }, 500)
    // })
}

const Button: FC<ButtonProps> = ({ children, isLoading, ...props }) => {
    const baseStyle = cn('p-4 bg-blue-500 text-white rounded-md', props.className)
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        createRipple(e)
        props.onClick?.(e)
    }
    return (
        <button {...props} onClick={onClick} className={baseStyle}>
            <Loader isLoading={isLoading}>{children}</Loader>
        </button>
    )
}

export default Button
