import type { Meta, StoryObj } from '@storybook/react'

import Tooltip from '../components/ui/Tooltip'

const meta = {
    title: 'Tooltip',
    component: Tooltip,
    argTypes: {
        position: {
            control: {
                type: 'select',
                options: ['top', 'bottom', 'left', 'right'],
            },
        },
        content: {
            control: {
                type: 'text',
            },
        },
        children: {
            table: {
                disable: true,
            },
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

export const Primary: Story = {
    name: 'Tooltip',
    render: (args) => {
        return (
            <Tooltip content={<div>This is a tooltip</div>} {...args}>
                <div className="p-4 bg-primary font-medium text-white rounded-md">
                    Hover me
                </div>
            </Tooltip>
        )
    },
}
