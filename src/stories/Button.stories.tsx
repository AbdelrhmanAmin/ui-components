import type { Meta, StoryObj } from '@storybook/react'
import Button from '../components/ui/Button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Button',
    component: Button,
    args: {
        variant: 'primary',
        children: 'Button',
        isLoading: false,
        isCentered: false,
        isDark: false,
    },
    argTypes: {
        rippleConfig: { table: { disable: true } },
        isCentered: { name: 'Ripple-Centered' },
        isDark: { name: 'Ripple-Dark' },
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary'],
        },
    },
} as Meta

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    name: 'Button',
    render: ({ children, isLoading, isCentered, isDark, ...rest }) => (
        <Button
            isLoading={isLoading}
            rippleConfig={{ isCentered, isDark }}
            {...rest}
        >
            {children}
        </Button>
    ),
}
