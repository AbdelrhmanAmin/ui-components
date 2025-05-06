import type { Meta, StoryObj } from '@storybook/react'

import Command from '../components/actions/Combo'
import Panel from '../components/actions/Panel'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Command',
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
    name: 'Command',
    render: () => (
        <Panel>
            <Panel.Trigger>Press Ctrl + K</Panel.Trigger>
            <Panel.Content className="border border-border rounded-md bg-background">
                <Command>
                    <Command.Input placeholder="Search..." />
                    <Command.Group>
                        <Command.Item>Item 1 😊</Command.Item>
                        <Command.Item>Item 2</Command.Item>
                        <Command.Item>Item 3</Command.Item>
                        <Command.Item>Item 4</Command.Item>
                        <Command.Item>Item 5</Command.Item>
                    </Command.Group>
                </Command>
            </Panel.Content>
        </Panel>
    ),
}

const Commander = ({ children }: { children: React.ReactNode }) => {}
