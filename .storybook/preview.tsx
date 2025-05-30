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
        (Story) => (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: '#f0f0f0',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                }}
            >
                <Story />
                <Toaster />
            </div>
        ),
    ],
}

export default preview
