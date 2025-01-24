type RippleConfig = {
    duration?: number
    isCentered?: boolean
}

const createRippleImpl = (options?: RippleConfig) => {
    const rippleConfig = {
        duration: 400,
        isCentered: true,
    }
    if (options) {
        if (typeof options.duration === 'number')
            rippleConfig.duration = options.duration
        if (typeof options.isCentered === 'boolean')
            rippleConfig.isCentered = options.isCentered
    }

    return (event: React.MouseEvent) => {
        const element = event.currentTarget
        requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect()
            const diameter = Math.max(element.clientWidth, element.clientHeight)
            const radius = diameter / 2

            const circle = document.createElement('span')
            Object.assign(circle.style, {
                width: `${diameter}px`,
                height: `${diameter}px`,
                position: 'absolute',
                borderRadius: '50%',
                transform: 'scale(0)',
                animation: `ripple ${rippleConfig.duration}ms linear`,
                animationFillMode: 'forwards',
                background: 'rgba(255, 255, 255, 0.3)',
            })
            if (rippleConfig.isCentered) {
                circle.style.left = `${rect.width / 2 - radius}px`
                circle.style.top = `${rect.height / 2 - radius}px`
            } else {
                circle.style.left = `${event.clientX - rect.left - radius}px`
                circle.style.top = `${event.clientY - rect.top - radius}px`
            }
            circle.classList.add('ripple')

            const ripple = element.getElementsByClassName('ripple')[0]

            if (ripple) {
                ripple.remove()
            }

            element.appendChild(circle)
        })
    }
}
export default createRippleImpl
// usage: const createRippleButton = createRippleImpl({ isCentered: false })
// Button.onClick={(e) => { createRippleButton(e); onClick(e) }}
