import type { Meta, StoryObj } from '@storybook/react'

import Command from '../components/actions/Combo'
import Panel from '../components/actions/Panel'
import { useContext, useEffect } from 'react'
import Modal from '../components/actions/Modal'

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
            <strong>Press Ctrl + X</strong>
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
            <Command>
                <Command.Input placeholder="Search..." />
                <Command.Group>
                    <Command.Item>
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
                    <Command.Item>
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
                    <Command.Item>DUPLICATED_TEXT_BUT_UNIQUE_ID</Command.Item>
                    <Command.Item>DUPLICATED_TEXT_BUT_UNIQUE_ID</Command.Item>
                    <Command.Item>DUPLICATED_TEXT_BUT_UNIQUE_ID</Command.Item>
                    <Command.Item>DUPLICATED_TEXT_BUT_UNIQUE_ID</Command.Item>
                    <Command.Item>DUPLICATED_TEXT_BUT_UNIQUE_ID</Command.Item>
                    <Command.Item>DUPLICATED_TEXT_BUT_UNIQUE_ID</Command.Item>
                    <Command.Item>Connections</Command.Item>
                    <Command.Item>Customer Support</Command.Item>
                    <Command.Item>Documents</Command.Item>
                    <Command.Item>Downloads</Command.Item>
                    <Command.Item>Files</Command.Item>
                    <Command.Item>Folder</Command.Item>
                    <Command.Item>Gallery</Command.Item>
                    <Command.Item>Images</Command.Item>
                    <Command.Item>Mail</Command.Item>
                    <Command.Item>Music</Command.Item>
                    <Command.Item>Notes</Command.Item>
                    <Command.Item>Photos</Command.Item>
                    <Command.Item>Reminders</Command.Item>
                    <Command.Item>Settings</Command.Item>
                    <Command.Item>Shortcuts</Command.Item>
                    <Command.Item>System</Command.Item>
                </Command.Group>
            </Command>
        </Modal.Content>
    )
}
