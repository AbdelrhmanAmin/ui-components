import type { Meta, StoryObj } from '@storybook/react'

import Toggle, { Checkbox, Radio } from '../components/ui/Toggle'
import ToggleGroup from '../components/ui/Toggle/Group'

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
        <ToggleGroup type="single">
            <Toggle value="1">Active</Toggle>
            <Toggle value="2">Active</Toggle>
            <Toggle value="3">Active</Toggle>
        </ToggleGroup>
    ),
}
export const ToggleGroupMultiple: Story = {
    name: 'Multiple Toggle Group',
    render: () => (
        <ToggleGroup type="multiple">
            <Toggle value="1">Active</Toggle>
            <Toggle value="2">Active</Toggle>
            <Toggle value="3">Active</Toggle>
        </ToggleGroup>
    ),
}

export const RadioGroup: Story = {
    name: 'Radio Group',
    render: () => (
        <ToggleGroup type="single">
            <Radio value="1">Active</Radio>
            <Radio value="2">Active</Radio>
            <Radio value="3">Active</Radio>
        </ToggleGroup>
    ),
}
