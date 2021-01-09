module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error"
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript',
  ],
  ignorePatterns: [
    "cypress/**",
    "docs/**",
    "test/**",
  ],
}
