import type { Meta, StoryObj } from '@storybook/react'

import Select from '../components/ui/Select'
import { toast } from '../components/ui/Toast'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Selector',
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
    name: 'Selector',
    render: () => (
        <Select
            options={[
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
                { value: '3', label: 'Option 3' },
                { value: '4', label: 'Option 4' },
                { value: '5', label: 'Option 5' },
                { value: '6', label: 'Option 6' },
                { value: '7', label: 'Option 7' },
                { value: '8', label: 'Option 8' },
                { value: '9', label: 'Option 9' },
                { value: '10', label: 'Option 10' },
                { value: '11', label: 'Option 11' },
                { value: '12', label: 'Option 12' },
                { value: '13', label: 'Option 13' },
                { value: '14', label: 'Option 14' },
                { value: '15', label: 'Option 15' },
                { value: '16', label: 'Option 16' },
                { value: '17', label: 'Option 17' },
                { value: '18', label: 'Option 18' },
                { value: '19', label: 'Option 19' },
                { value: '20', label: 'Option 20' },
            ]}
            type="multiple"
            onMenuEnd={() => {
                toast('scrolled to bottom', {
                    duration: 500,
                })
            }}
            disabled
        />
    ),
}
