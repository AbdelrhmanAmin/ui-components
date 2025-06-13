import type { Meta, StoryObj } from '@storybook/react'
import Drawer from '../components/ui/Drawer'
import Button from '../components/ui/Button'

const meta: Meta<typeof Drawer> = {
    title: 'Drawer',
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
    name: 'Default',
    render: () => (
        <Drawer>
            <Drawer.Trigger>
                <Button>Open Drawer</Button>
            </Drawer.Trigger>
            <Drawer.Content>
                <h3 className="text-lg font-medium">Drawer Content</h3>
                <p className="text-muted mt-2">
                    This is an example drawer that slides in from the right side
                    of the screen.
                </p>
            </Drawer.Content>
        </Drawer>
    ),
}

export const LeftPosition: Story = {
    name: 'Left Position',
    render: () => (
        <Drawer>
            <Drawer.Trigger>
                <Button>Open Left Drawer</Button>
            </Drawer.Trigger>
            <Drawer.Content position="left">
                <h3 className="text-lg font-medium">Left Drawer</h3>
                <p className="text-muted mt-2">
                    This drawer slides in from the left side of the screen.
                </p>
            </Drawer.Content>
        </Drawer>
    ),
}

export const BottomPosition: Story = {
    name: 'Bottom Position',
    render: () => (
        <Drawer>
            <Drawer.Trigger>
                <Button>Open Bottom Drawer</Button>
            </Drawer.Trigger>
            <Drawer.Content position="bottom">
                <h3 className="text-lg font-medium">Bottom Drawer</h3>
                <p className="text-muted mt-2">
                    This drawer slides up from the bottom of the screen.
                </p>
            </Drawer.Content>
        </Drawer>
    ),
}
