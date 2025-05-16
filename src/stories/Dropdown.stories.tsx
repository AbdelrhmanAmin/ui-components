import type { Meta, StoryObj } from '@storybook/react'
import Panel from '../components/ui/Panel'
import Button from '../components/ui/Button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Dropdown',
    argTypes: {
        positionX: {
            control: {
                type: 'inline-radio',
            },
            options: ['left', 'right'],
        },
        positionY: {
            control: {
                type: 'inline-radio',
            },
            options: ['top', 'bottom'],
        },
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Story />
            </div>
        ),
    ],
} as Meta

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    name: 'Dropdown',
    render: ({ positionX, positionY }) => (
        <Panel>
            <Panel.StyledTrigger>Open</Panel.StyledTrigger>
            <Panel.Content positionX={positionX} positionY={positionY}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        padding: '1rem',
                        background: 'black',
                        color: 'white',
                        borderRadius: '0.5rem',
                        width: '200px',
                    }}
                >
                    <Button className="bg-blue-400">Option 1</Button>
                    <Button className="bg-blue-400">Option 2</Button>
                    <Button className="bg-blue-400">Option 3</Button>
                </div>
            </Panel.Content>
        </Panel>
    ),
}
