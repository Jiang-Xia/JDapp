/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  globals:{
    // PDFLib: {},
    // pdfjsLib: {},
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'semi': ['error', 'never'], //禁止使用分号
    'quotes': [1, 'single']
  }
}
