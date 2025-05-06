export type RippleConfig = {
    duration: number;
    isCentered: boolean;
    isDark: boolean;
};

const createRippleImpl = (options?: Partial<RippleConfig>) => {
    const rippleConfig = {
        duration: 500,
        isCentered: true,
        isDark: false,
    };
    if (options) {
        if (typeof options.duration === 'number')
            rippleConfig.duration = options.duration;
        if (typeof options.isCentered === 'boolean')
            rippleConfig.isCentered = options.isCentered;
        if (typeof options.isDark === 'boolean')
            rippleConfig.isDark = options.isDark;
    }
    const baseStyle = {
        position: 'absolute',
        borderRadius: '50%',
        transform: 'scale(0)',
        animation: `ripple ${rippleConfig.duration}ms linear`,
        animationFillMode: 'forwards',
        background: rippleConfig.isDark
            ? 'rgba(0, 0, 0, 0.3)'
            : 'rgba(255, 255, 255, 0.3)',
    };
    return (event: React.MouseEvent) => {
        const element = event.currentTarget;

        requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            const diameter = Math.max(
                element.clientWidth,
                element.clientHeight
            );
            const radius = diameter / 2;

            const circle = document.createElement('span');
            Object.assign(circle.style, {
                width: `${diameter}px`,
                height: `${diameter}px`,
                ...baseStyle,
            });
            if (rippleConfig.isCentered) {
                circle.style.left = `${rect.width / 2 - radius}px`;
                circle.style.top = `${rect.height / 2 - radius}px`;
            } else {
                circle.style.left = `${event.clientX - rect.left - radius}px`;
                circle.style.top = `${event.clientY - rect.top - radius}px`;
            }
            circle.classList.add('ripple');

            const ripple = element.getElementsByClassName('ripple')[0];

            if (ripple) {
                ripple.remove();
            }

            element.appendChild(circle);
            circle.addEventListener('animationend', () => {
                circle.remove();
            });
        });
    };
};
export default createRippleImpl;
// usage: const createRippleButton = createRippleImpl({ isCentered: false })
// Button.onClick={(e) => { createRippleButton(e); onClick(e) }}
