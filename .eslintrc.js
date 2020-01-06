const base = require('@umijs/fabric/dist/eslint');

module.exports = {
  ...base,
  rules: {
    ...base.rules,
    'import/no-named-as-default': 0,
    'no-template-curly-in-string': 0,
    'prefer-promise-reject-errors': 0,
    'react/no-array-index-key': 0,
    'react/require-default-props': 0,
    'react/sort-comp': 0,
    'react/no-find-dom-node': 1,
    '@typesript-eslint/no-explicity-any': 0,
    'jsx-ally/label-has-associated-control': 0,
    'jsx-ally/label-has-for': 0,
    'eslint-comments/no-unlimited-disable': 'off',
  }
}
