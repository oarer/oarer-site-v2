import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginImport from 'eslint-plugin-import'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['.next/*', 'node_modules', 'dist']),

  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    settings: {
      react: {
        version: 'detect',
        jsxRuntime: 'automatic',
      },
    },
    plugins: {
      js,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      import: pluginImport,
      'jsx-a11y': pluginJsxA11y,
      prettier: pluginPrettier,
      'unused-imports': pluginUnusedImports,
      '@tanstack/query': pluginQuery,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-sort-props': 'error',
      'react/jsx-pascal-case': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-uses-vars': 'error',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'always',
        },
      ],
      'import/no-duplicates': 'error',

      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          required: {
            some: ['nesting', 'id'],
          },
        },
      ],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/no-empty-function': 'warn',

      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
    },
  },
  ...tseslint.configs.recommended,
  ...pluginQuery.configs['flat/recommended'],
])
