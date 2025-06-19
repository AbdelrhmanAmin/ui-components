import type { Preview } from '@storybook/react'
import '../src/index.css'
import 'tailwindcss/tailwind.css'
import Toaster from '../src/components/ui/Toast'
import React from 'react'
import { SidebarProvider } from '../src/components/ui/Sidebar'
import { AppSidebar } from '../src/components/ui/Sidebar/Sample'

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story, { args }) => (
            <SidebarProvider>
                <div className="h-svh flex relative scale-100">
                    <AppSidebar />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            width: '100%',
                            backgroundColor: '#f0f0f0',
                            position: 'relative',
                            padding: '20px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Story />
                        {!args.hasLocalToaster && <Toaster />}
                    </div>
                </div>
            </SidebarProvider>
        ),
    ],
}

export default preview
