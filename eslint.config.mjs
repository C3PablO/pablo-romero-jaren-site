import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettierRecommended,
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'prettier/prettier': ['error', { singleQuote: true }],
      'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
      'jsx-a11y/anchor-is-valid': 'off', // Next.js use his own internal link system
      'react/require-default-props': 'off', // Allow non-defined react props as undefined
      'react/jsx-props-no-spreading': 'off', // _app.tsx uses spread operator and also, react-hook-form
      '@next/next/no-img-element': 'off', // We currently not using next/image because it isn't supported with SSG mode
      'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
      'class-methods-use-this': 'off', // _document.tsx use render method without `this` keyword
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off', // Project intentionally uses `any` in a few interop spots
      '@typescript-eslint/no-empty-object-type': 'off', // Icon components extend HTML attribute types with empty interfaces
      '@typescript-eslint/no-require-imports': 'off', // colorthief has no ESM/type-friendly entry
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
        },
      ],
    },
  },
];

export default config;
