import type { Meta, StoryObj } from '@storybook/react'

import Collapsible from '../components/display/Collapsible'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Collapsible',
    component: Collapsible,
} as Meta

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    name: 'Collapsible',
    render: () => (
        <Collapsible className="max-w-sm">
            <Collapsible.Trigger className="p-2 w-full bg-primary">
                Open Collapsible
            </Collapsible.Trigger>
            <Collapsible.Content className="bg-background">
                <div className='flex flex-col gap-2 p-4'>
                    <div className="px-2 py-1 font-medium rounded bg-primary border border-border text-muted">
                        Content
                    </div>
                    <div className="px-2 py-1 font-medium rounded bg-primary border border-border text-muted">
                        Content
                    </div>
                    <div className="px-2 py-1 font-medium rounded bg-primary border border-border text-muted">
                        Content
                    </div>
                </div>
            </Collapsible.Content>
        </Collapsible>
    ),
}
