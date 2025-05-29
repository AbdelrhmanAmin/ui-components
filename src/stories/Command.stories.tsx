import type { Meta, StoryObj } from '@storybook/react'

import Command from '../components/ui/Combo'
import { useContext, useEffect } from 'react'
import Modal from '../components/ui/Modal'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Command',
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
    name: 'Command',
    render: () => (
        <Modal>
            <strong className='text-accent'>Press Ctrl + X</strong>
            <Commander />
        </Modal>
    ),
}

const Commander = () => {
    const { setIsOpen } = useContext(Modal.ctx)
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            const isCtrlX = e.key === 'x' && (e.metaKey || e.ctrlKey)
            if (isCtrlX) {
                e.preventDefault()
                setIsOpen(true)
            }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])
    return (
        <Modal.Content className="bg-background">
            <Command type="multiple" defaultValue={['Files']}>
                <Command.Input placeholder="Search..." />
                <Command.Group>
                    <Command.Item value="calendar">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4 mr-2 opacity-50"
                        >
                            <rect
                                x="3"
                                y="4"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                            ></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>Calendar</span>
                    </Command.Item>
                    <Command.Item value="calculator">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4 mr-2 opacity-50"
                        >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        <span>Calculator</span>
                    </Command.Item>
                    <Command.Item value="Connections">Connections</Command.Item>
                    <Command.Item value="Customer Support">Customer Support</Command.Item>
                    <Command.Item value="Documents">Documents</Command.Item>
                    <Command.Item value="Downloads">Downloads</Command.Item>
                    <Command.Item value="Files">Files</Command.Item>
                    <Command.Item value="Folder">Folder</Command.Item>
                    <Command.Item value="Gallery">Gallery</Command.Item>
                    <Command.Item value="Images">Images</Command.Item>
                    <Command.Item value="Mail">Mail</Command.Item>
                    <Command.Item value="Music">Music</Command.Item>
                    <Command.Item value="Notes">Notes</Command.Item>
                    <Command.Item value="Photos">Photos</Command.Item>
                    <Command.Item value="Reminders">Reminders</Command.Item>
                    <Command.Item value="Settings">Settings</Command.Item>
                    <Command.Item value="Shortcuts">Shortcuts</Command.Item>
                    <Command.Item value="System">System</Command.Item>
                </Command.Group>
            </Command>
        </Modal.Content>
    )
}
