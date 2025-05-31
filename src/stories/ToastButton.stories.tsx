import type { Meta, StoryObj } from '@storybook/react'
import Button from '../components/ui/Button'
import Toaster, { toast } from '../components/ui/Toast'
import { useState } from 'react'

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
        hasLocalToaster: true,
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
    decorators: [
        (Story) => (
            <>
                <Story />
                <Toaster />
            </>
        ),
    ],
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

export const ToasterStory: Story = {
    name: 'Toaster',
    render: () => <App />,
}

function App() {
    const [reverseOrder, setReverseOrder] = useState(false)
    const [lastType, setLastType] = useState<
        'success' | 'error' | 'info' | undefined
    >(undefined)
    const generateRandomToast = () => {
        const types = ['success', 'error', 'info']
        // Never use the same type twice in a row
        let randomType = types[Math.floor(Math.random() * types.length)]
        if (randomType === lastType) {
            randomType = types[(types.indexOf(randomType) + 1) % types.length]
        }
        setLastType(randomType as 'success' | 'error' | 'info')

        toast('Hello, world!', {
            duration: 10000,
            type: randomType as 'success' | 'error' | 'info',
            position: 'top-center',
        })
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            Please run `npm run storybook` to view the components.
            <Button onClick={generateRandomToast}>Click me</Button>
            <Button onClick={() => setReverseOrder(!reverseOrder)}>
                Reverse Order
            </Button>
            <Toaster reverseOrder={reverseOrder} />
        </div>
    )
}
