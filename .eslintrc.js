module.exports = {
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  plugins: ['simple-import-sort'],
  env: {
    browser: true,
    node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // myGlobal: false
  },
  rules: {
    'no-implicit-coercion': 'off',
    'no-extra-boolean-cast': 'off',
    'no-param-reassign': 'off',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    'max-params': 'off',
    'react/no-unknown-property': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  settings: {},
}
