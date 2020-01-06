const base = require('@umijs/fabric/dist/eslint');

module.exports = {
  ...base,
  rules: {
    ...base.rules,
    'import/no-named-as-default': 0,
    'no-template-curly-in-string': 0,
  }
}
