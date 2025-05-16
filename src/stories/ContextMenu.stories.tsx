import type { Meta, StoryObj } from '@storybook/react'

import ContextMenu from '../components/ui/ContextMenu'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = { title: 'ContextMenu', component: ContextMenu } as Meta

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    name: 'ContextMenu',
    render: () => (
        <ContextMenu>
            <ContextMenu.Trigger>
                <div className="w-64 h-64 bg-gray-200 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-700">
                    Right Click Me
                </div>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
                <ContextMenu.Item>Option 1</ContextMenu.Item>
                <ContextMenu.Item>Option 2</ContextMenu.Item>
                <ContextMenu>
                    <ContextMenu.Trigger isSub>
                        <ContextMenu.Item>Option 3</ContextMenu.Item>
                    </ContextMenu.Trigger>
                    <ContextMenu.Content>
                        <ContextMenu.Item>Sub Option 1</ContextMenu.Item>
                        <ContextMenu>
                            <ContextMenu.Trigger isSub>
                                <ContextMenu.Item>
                                    Sub Option 2
                                </ContextMenu.Item>
                            </ContextMenu.Trigger>
                            <ContextMenu.Content>
                                <ContextMenu.Item>
                                    Sub Sub Option 1
                                </ContextMenu.Item>
                                <ContextMenu.Item>
                                    Sub Sub Option 2
                                </ContextMenu.Item>
                                <ContextMenu.Item>
                                    Sub Sub Option 3
                                </ContextMenu.Item>
                            </ContextMenu.Content>
                        </ContextMenu>
                        <ContextMenu.Item>Sub Option 3</ContextMenu.Item>
                    </ContextMenu.Content>
                </ContextMenu>
            </ContextMenu.Content>
        </ContextMenu>
    ),
}
