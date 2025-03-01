import tseslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'

/** @type {import('eslint').Linter.Config} */
export default {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        ...tseslint.configs.recommended,
    ],
    plugins: ['react', 'prettier'],
    rules: {
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
    },
}
