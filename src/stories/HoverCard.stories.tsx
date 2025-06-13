import type { Meta, StoryObj } from '@storybook/react'

import Panel from '../components/ui/Panel'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = { title: 'HoverCard' } as Meta

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    name: 'HoverCard',
    render: HoverCardDemo,
}

function HoverCardDemo() {
    return (
        <Panel>
            <Panel.Trigger isHoverable className="font-bold text-accent hover:underline">
                @nextjs
            </Panel.Trigger>
            <Panel.Content gutter={10}>
                <div className="flex p-2 bg-accent gap-1 w-80 rounded-md border-border border">
                    <img
                        src="https://github.com/vercel.png"
                        className="w-8 h-8 rounded-full"
                    />

                    <div className="space-y-1 w-full">
                        <h4 className=" font-semibold">@nextjs</h4>
                        <p className="text-sm">
                            The React Framework – created and maintained by
                            @vercel.
                        </p>
                        <div className="text-muted-foreground text-xs">
                            Joined December 2021
                        </div>
                    </div>
                </div>
            </Panel.Content>
        </Panel>
    )
}
