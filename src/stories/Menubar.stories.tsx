import type { Meta, StoryObj } from '@storybook/react'

import Menubar from '../components/display/Menubar'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = { title: 'Menubar', component: Menubar } as Meta

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    name: 'Menubar',
    render: () => <Menubar />,
}
