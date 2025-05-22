import type { Meta, StoryObj } from '@storybook/react'

import Toggle, { Checkbox, Radio } from '../components/ui/Toggle'
import Group from '../components/ui/Toggle/Group'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Toggle',
    component: Toggle,
} as Meta

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ToggleStory: Story = {
    name: 'Toggle',
    render: () => <Toggle>Active</Toggle>,
}

export const CheckboxStory: Story = {
    name: 'Checkbox',
    render: () => <Checkbox>Active</Checkbox>,
}

export const ToggleGroupSingle: Story = {
    name: 'Single Toggle Group',

    render: () => (
        <Group type="single">
            <Group.Option value="1">Active</Group.Option>
            <Group.Option value="2">Active</Group.Option>
            <Group.Option value="3">Active</Group.Option>
        </Group>
    ),
}
export const ToggleGroupMultiple: Story = {
    name: 'Multiple Toggle Group',
    render: () => (
        <Group type="multiple">
            <Group.Option value="1">Active</Group.Option>
            <Group.Option value="2">Active</Group.Option>
            <Group.Option value="3">Active</Group.Option>
        </Group>
    ),
}

export const RadioGroup: Story = {
    name: 'Radio Group',
    render: () => (
        <Group type="single">
            <Radio value="1">Active</Radio>
            <Radio value="2">Active</Radio>
            <Radio value="3">Active</Radio>
        </Group>
    ),
}
