import type { Meta, StoryObj } from '@storybook/react'
import { AppSidebar } from '../components/ui/Sidebar/Sample'
import { SidebarProvider } from '../components/ui/Sidebar'

const meta = {
    title: 'Sidebar',
    component: AppSidebar,
    decorators: [
        (Story) => (
            <SidebarProvider>
                <Story />
            </SidebarProvider>
        ),
    ],
} satisfies Meta<typeof AppSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    name: 'Sidebar',
    render: () => <AppSidebar />,
}
