import type { Meta, StoryObj } from '@storybook/react'

import Toggle, { Checkbox } from '../components/ui/Toggle'
import Group from '../components/ui/Toggle/Group'
import { useState } from 'react'
import cn from '../utils/cn'
import Switch from '../components/ui/Toggle/Switch'

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
    render: () => (
        <Toggle>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="data-[checked=on]:opacity-100 text-yellow-500 data-[checked=off]:opacity-50"
            >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
        </Toggle>
    ),
}

export const CheckboxStory: Story = {
    name: 'Checkbox',
    render: () => (
        <Checkbox markClassName="data-[checked=on]:bg-red-500">Active</Checkbox>
    ),
}

export const SwitchStory: Story = {
    name: 'Switch',
    render: () => (
        <div className="flex items-center gap-2 text-accent font-semibold">
            <Switch id="switch" />
            <label htmlFor="switch">Mode</label>
        </div>
    ),
}

export const ToggleGroupSingle: Story = {
    name: 'Single Toggle Group',
    render: () => {
        const [value, setValue] = useState<string>('1')
        return (
            <Group
                type="single"
                value={value}
                onChange={(v) => setValue(v)}
                className="flex gap-2"
            >
                <Group.Toggle
                    value="1"
                    className={cn({
                        '!bg-red-500': value === '1',
                    })}
                >
                    Red
                </Group.Toggle>
                <Group.Toggle
                    value="2"
                    className={cn({
                        '!bg-yellow-500': value === '2',
                    })}
                >
                    Yellow
                </Group.Toggle>
                <Group.Toggle
                    value="3"
                    className={cn({
                        '!bg-green-500': value === '3',
                    })}
                >
                    Green
                </Group.Toggle>
            </Group>
        )
    },
}
export const ToggleGroupMultiple: Story = {
    name: 'Multiple Toggle Group',
    render: () => {
        return (
            <Group type="multiple" className="flex gap-2">
                <Group.Toggle
                    value="1"
                    className="data-[checked=on]:bg-red-400"
                >
                    Red
                </Group.Toggle>
                <Group.Toggle
                    value="2"
                    className="data-[checked=on]:bg-yellow-500"
                >
                    Yellow
                </Group.Toggle>
                <Group.Toggle
                    value="3"
                    className="data-[checked=on]:bg-green-600"
                >
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
            <Group.Radio
                value="3"
                markClassName="data-[checked=on]:bg-green-600"
            >
                Green
            </Group.Radio>
        </Group>
    ),
}
