import type { Meta, StoryObj } from '@storybook/react'
import Button from '../components/ui/Button'
import Toaster, { toast } from '../components/ui/Toast'
import { useState } from 'react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Toaster',
    component: Toaster,
    args: {
        position: 'top-center',
        duration: 3000,
        type: 'success',
        hasLocalToaster: true,
    },
    argTypes: {
        position: {
            control: { type: 'select' },
            options: [
                'top-center',
                'top-right',
                'top-left',
                'bottom-center',
                'bottom-right',
                'bottom-left',
            ],
        },
        duration: {
            control: { type: 'number' },
            description: 'Duration of the toast in milliseconds',
            defaultValue: 3000,
        },
        type: {
            control: { type: 'select' },
            options: ['success', 'error', 'info'],
            description: 'Type of the toast',
        },
        message: {
            table: { disable: true },
        },
        hasLocalToaster: {
            table: { disable: true },
        },
        reverseOrder: {
            table: { disable: true },
        },
    },
} as Meta

export default meta

type Story = StoryObj<typeof meta>

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
        const randomTexts = [
            'Hello, world!',
            'This is a toast message',
            'This is another toast message',
            'This is a third toast message',
            'This is a fourth toast message',
            'This is a fifth toast message',
            'This is a sixth toast message',
        ]
        // Never use the same type twice in a row
        let randomType = types[Math.floor(Math.random() * types.length)]
        if (randomType === lastType) {
            randomType = types[(types.indexOf(randomType) + 1) % types.length]
        }
        const randomText =
            randomTexts[Math.floor(Math.random() * randomTexts.length)]
        setLastType(randomType as 'success' | 'error' | 'info')

        toast(randomText, {
            duration: 10000,
            type: randomType as 'success' | 'error' | 'info',
            position: 'top-center',
        })
    }
    return (
        <div>
            <Button onClick={generateRandomToast}>Click me</Button>
            <Button onClick={() => setReverseOrder(!reverseOrder)}>
                Reverse Order
            </Button>
            <Toaster reverseOrder={reverseOrder} />
        </div>
    )
}
