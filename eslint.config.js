import eslint from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    { ignores: ['**/*.stories.tsx', 'eslint.config.js'] },
    {
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.browser,
                React: 'readonly',
                JSX: 'readonly',
                google: 'readonly',
            },
        },
        plugins: { 'react-hooks': reactHooks, react: reactPlugin },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...eslint.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            'no-redeclare': 'off',
            '@typescript-eslint/no-redeclare': 'error',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/no-explicit-any': 'off',

            'react/jsx-uses-react': 'off', // Disable the rule for React 17+
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-enum-comparison': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off',
            'react/prop-types': 'off',
            'react/no-unknown-property': 'off',
        },
    }
)
