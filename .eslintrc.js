const TSReactExtends = [
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking',
  'plugin:@typescript-eslint/strict',
  'plugin:import/typescript',
  'plugin:react/recommended',
  'plugin:react-hooks/recommended',
  'plugin:storybook/recommended',
]

const TSParserOptions = {
  ecmaVersion: 2022,
  sourceType: 'module',
  tsconfigRootDir: __dirname,
  project: ['./tsconfig.json'],
}

const disabledCommonRules = [
  'one-var',
  'sort-keys',
  'sort-imports',
  'require-unicode-regexp',
  'multiline-comment-style',
  'max-lines-per-function',
  'no-ternary',
  'no-plusplus',
  'id-length',
  'capitalized-comments',
  'no-warning-comments',
  'consistent-return',
  'max-statements',
  'no-magic-numbers',
  'no-shadow',
  'lines-between-class-members',
  'init-declarations',
  'max-params',
  'sort-vars',
  'unicorn/prefer-module',
  'unicorn/no-null',
  'unicorn/no-document-cookie',
  'unicorn/no-console-spaces',
  'unicorn/filename-case',
  'unicorn/import-style',
  'unicorn/explicit-length-check',
  'unicorn/no-array-reduce',
  'unicorn/no-array-for-each',
  'unicorn/no-array-callback-reference',
  'unicorn/prefer-object-from-entries',
  'unicorn/prevent-abbreviations',
  'unicorn/no-new-array',
  'unicorn/no-await-expression-member',
  'unicorn/consistent-function-scoping',
]

const commonRules = {
  ...disabledCommonRules.reduce((result, rule) => ({ ...result, [rule]: 'off' }), {}),
  'no-unused-expressions': ['error', { allowShortCircuit: true }],
}

const disabledTSReactRules = [
  'react/jsx-uses-react',
  'react/react-in-jsx-scope',
  'react/no-unescaped-entities',
  '@typescript-eslint/no-non-null-assertion',
  '@typescript-eslint/non-nullable-type-assertion-style',
]

const TSReactRules = {
  ...disabledTSReactRules.reduce((result, rule) => ({ ...result, [rule]: 'off' }), {}),
  '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
  'react/no-unknown-property': ['error', { ignore: ['css'] }],
  '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
}

module.exports = {
  ignorePatterns: ['dist/**'],
  root: true,
  env: {
    es2022: true,
  },
  extends: ['eslint:all', 'plugin:import/recommended', 'plugin:unicorn/recommended', 'prettier'],
  plugins: ['import'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      webpack: {
        config: 'webpack.config.js',
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: commonRules,
  overrides: [
    {
      files: [
        'webpack.*.js',
        '.eslintrc.js',
        'jest.config.js',
        'commitlint.config.js',
        'release.config.js',
      ],
      env: { node: true },
    },
    {
      files: ['*.{ts,tsx}'],
      env: { browser: true },
      extends: TSReactExtends,
      plugins: ['react', '@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: TSParserOptions,
      rules: TSReactRules,
    },
    {
      files: ['*.test.{ts,tsx}'],
      env: { browser: true, jest: true },
      extends: [
        ...TSReactExtends,
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:testing-library/react',
        'plugin:jest-extended/all',
      ],
      plugins: ['react', '@typescript-eslint', 'jest', 'testing-library'],
      parser: '@typescript-eslint/parser',
      parserOptions: TSParserOptions,
      rules: {
        ...TSReactRules,
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/dot-notation': 'off',
      },
    },
  ],
}
