import type { Preview } from '@storybook/react'
import '../src/index.css'
import 'tailwindcss/tailwind.css'
import Toaster from '../src/components/ui/Toast'
import React from 'react'

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
            <div className="h-svh flex relative scale-100">
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
        ),
    ],
}

export default preview
