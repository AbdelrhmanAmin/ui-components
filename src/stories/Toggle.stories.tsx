import type { Meta, StoryObj } from '@storybook/react'

import Toggle, { Checkbox } from '../components/ui/Toggle'
import Group from '../components/ui/Toggle/Group'
import { useState } from 'react'

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
    render: () => {
        const [value, setValue] = useState<string>('1')
        return (
            <Group type="single" value={value} onChange={(v) => setValue(v)}>
                <Group.Toggle value="1">Active</Group.Toggle>
                <Group.Toggle value="2">Active</Group.Toggle>
                <Group.Toggle value="3">Active</Group.Toggle>
            </Group>
        )
    },
}
export const ToggleGroupMultiple: Story = {
    name: 'Multiple Toggle Group',
    render: () => {

        return (
            <Group type="multiple" className="flex gap-2">
                <Group.Toggle value="1" className="data-[checked=on]:bg-red-400">
                    Red
                </Group.Toggle>
                <Group.Toggle value="2" className="data-[checked=on]:bg-yellow-500">
                    Yellow
                </Group.Toggle>
                <Group.Toggle value="3" className="data-[checked=on]:bg-green-600">
                    Green
                </Group.Toggle>
            </Group>
        )
    },
}

export const RadioGroup: Story = {
    name: 'Radio Group',
    render: () => (
        <Group type="single" defaultValue="3">
            <Group.Radio value="1" markClassName="data-[checked=on]:bg-red-400">
                Red
            </Group.Radio>
            <Group.Radio
                value="2"
                markClassName="data-[checked=on]:bg-yellow-500"
            >
                Yellow
            </Group.Radio>
            <Group.Radio value="3" markClassName="data-[checked=on]:bg-green-600">
                Green
            </Group.Radio>
        </Group>
    ),
}
