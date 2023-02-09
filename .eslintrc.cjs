/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }, 
  rules: {
    quotes: ['warn', 'single', { 'allowTemplateLiterals': true }],
    semi: ['warn', 'never'],
    'no-constant-condition': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/return-in-computed-property': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  }
}
