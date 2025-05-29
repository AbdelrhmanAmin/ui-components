import type { Meta, StoryObj } from '@storybook/react'

import Command from '../components/ui/Combo'
import Panel from '../components/ui/Panel'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Combobox',
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
    name: 'Combobox',
    render: () => (
        <Panel>
            <Panel.StyledTrigger>Search options 🔍</Panel.StyledTrigger>
            <Panel.Content className="list">
                <Command type="single" defaultValue="Item 2">
                    <Command.Input placeholder="Search..." />
                    <Command.Group>
                        <Command.Item value="Item 1">Item 1 😊</Command.Item>
                        <Command.Item value="Item 2">Item 2</Command.Item>
                        <Command.Item value="Item 3">Item 3</Command.Item>
                        <Command.Item value="Item 4">Item 4</Command.Item>
                        <Command.Item value="Item 5">Item 5</Command.Item>
                    </Command.Group>
                </Command>
            </Panel.Content>
        </Panel>
    ),
}
