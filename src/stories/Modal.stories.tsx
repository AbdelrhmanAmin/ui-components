import type { Meta, StoryObj } from '@storybook/react'

import Modal from '../components/actions/Modal'
import Button from '../components/actions/Button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = { title: 'Modal', component: Modal } as Meta

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    name: 'Modal',
    render: () => (
        <Modal>
            <Modal.Trigger>
                <Button>Open Modal</Button>
            </Modal.Trigger>
            <Modal.Content>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        padding: '1rem',
                        color: 'white',
                        borderRadius: '0.5rem',
                        width: '200px',
                    }}
                >
                    <Button>Option 1</Button>
                    <Button>Option 2</Button>
                    <Button variant="secondary">Option 3</Button>
                </div>
            </Modal.Content>
        </Modal>
    ),
}
