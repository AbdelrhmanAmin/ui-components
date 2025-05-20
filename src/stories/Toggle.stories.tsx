import type { Meta, StoryObj } from '@storybook/react'

import ToggableArea, { Checkbox } from '../components/ui/Toggle'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Toggle',
    component: ToggableArea,
} as Meta

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ToggleStory: Story = {
    name: 'Toggle',
    render: () => <ToggableArea>Active</ToggableArea>,
}

export const CheckboxStory: Story = {
    name: 'Checkbox',
    render: () => <Checkbox>Active</Checkbox>,
}
