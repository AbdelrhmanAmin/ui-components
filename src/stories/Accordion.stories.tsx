import type { Meta, StoryObj } from '@storybook/react'

import Accordion from '../components/ui/Accordion'
import Button from '../components/ui/Button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Accordion',
    component: Accordion,
    args: {
        type: 'single',
    },
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: ['single', 'multiple'],
            },
        },
    },
} as Meta

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    name: 'Accordion',
    render: ({ type }) => (
        <Accordion type={type} className="w-fit">
            <Accordion.Item value="item-1">
                <Accordion.Trigger>Open Accordion</Accordion.Trigger>
                <Accordion.Content>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            padding: '1rem',
                            color: 'white',
                            borderRadius: '0.5rem',
                            width: '200px',
                        }}
                    >
                        <Button>Option 1</Button>
                        <Button>Option 2</Button>
                        <Button variant="secondary">Option 3</Button>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2">
                <Accordion.Trigger>Open Accordion</Accordion.Trigger>
                <Accordion.Content>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            padding: '1rem',
                            color: 'white',
                            borderRadius: '0.5rem',
                            width: '200px',
                        }}
                    >
                        <Button>Option 1</Button>
                        <Button>Option 2</Button>
                        <Button variant="secondary">Option 3</Button>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-3">
                <Accordion.Trigger>Open Accordion</Accordion.Trigger>
                <Accordion.Content>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            padding: '1rem',
                            color: 'white',
                            borderRadius: '0.5rem',
                            width: '200px',
                        }}
                    >
                        <Button>Option 1</Button>
                        <Button>Option 2</Button>
                        <Button variant="secondary">Option 3</Button>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    ),
}
