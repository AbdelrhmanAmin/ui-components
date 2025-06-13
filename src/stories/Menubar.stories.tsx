import type { Meta, StoryObj } from '@storybook/react'

import Menubar from '../components/ui/Menubar'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = { title: 'Menubar', component: Menubar } as Meta

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    name: 'Menubar',
    render: () => (
        <Menubar>
            <Menubar.Item title="File">
                <div className="item">New</div>
                <div className="item">Open</div>
                <div className="item">Save</div>
                <div className="item">Save As</div>
            </Menubar.Item>
            <Menubar.Item title="Edit">
                <div className="item">Undo</div>
                <div className="item">Redo</div>
                <div className="item">Cut</div>
                <div className="item">Copy</div>
                <div className="item">Paste</div>
                <div className="item">Delete</div>
            </Menubar.Item>
            <Menubar.Item title="View">
                <div className="item">Zoom In</div>
                <div className="item">Zoom Out</div>
                <div className="item">Reset Zoom</div>
            </Menubar.Item>
        </Menubar>
    ),
}
