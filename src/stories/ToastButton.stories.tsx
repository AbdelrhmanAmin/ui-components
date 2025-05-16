import type { Meta, StoryObj } from '@storybook/react'
import Button from '../components/ui/Button'
import { toast } from '../components/ui/Toast'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Toast + Button',
    component: Button,
    args: {
        variant: 'primary',
        children: 'Button',
        isLoading: false,
        isCentered: false,
        isDark: false,
        toastVariant: 'info',
        toastMessage: 'Button clicked!',
        toastDuration: 3000,
    },
    argTypes: {
        rippleConfig: { table: { disable: true } },
        isCentered: { name: 'Ripple-Centered' },
        isDark: { name: 'Ripple-Dark' },
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary'],
        },
        toastVariant: {
            control: { type: 'select' },
            options: ['success', 'error', 'info'],
        },
        toastMessage: {
            control: { type: 'text' },
            description: 'Message to display in the toast',
        },
        toastDuration: {
            control: { type: 'number' },
            description: 'Duration of the toast in milliseconds',
            defaultValue: 3000,
        },
    },
} as Meta

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    name: 'Toast + Button',
    render: ({
        children,
        isLoading,
        isCentered,
        isDark,
        toastVariant,
        toastMessage,
        toastDuration,
        ...rest
    }) => (
        <Button
            isLoading={isLoading}
            rippleConfig={{ isCentered, isDark }}
            onClick={() => {
                toast(toastMessage, {
                    type: toastVariant,
                    duration: toastDuration,
                })
            }}
            {...rest}
        >
            {children}
        </Button>
    ),
}
