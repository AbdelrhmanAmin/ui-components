import type { Meta, StoryObj } from '@storybook/react'
import { AppSidebar } from '../components/ui/Sidebar/Sample'

const meta = {
    title: 'Sidebar',
    component: AppSidebar,
} satisfies Meta<typeof AppSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    name: 'Sidebar',
    render: () => <AppSidebar />,
}
