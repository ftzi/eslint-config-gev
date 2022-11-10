/**
 * File smartly and automatically generated by my scripts/makeTsExtensions.js
 *
 * Some Typescript rules extends the JS rules to also support TS syntax.
 * This disables the JS rules and have their values in the TS corresponding rules.
 */

module.exports = {
  rules: {
['default-param-last']: 'off',
['@typescript-eslint/default-param-last']: ["error"],

['lines-between-class-members']: 'off',
['@typescript-eslint/lines-between-class-members']: ["warn","always",{"exceptAfterSingleLine":true}],

['no-dupe-class-members']: 'off',
['@typescript-eslint/no-dupe-class-members']: ["error"],

['no-loss-of-precision']: 'off',
['@typescript-eslint/no-loss-of-precision']: ["error"],

['no-redeclare']: 'off',
['@typescript-eslint/no-redeclare']: ["error"],

['no-throw-literal']: 'off',
['@typescript-eslint/no-throw-literal']: ["warn"],

['no-unused-vars']: 'off',
['@typescript-eslint/no-unused-vars']: ["warn",{"ignoreRestSiblings":true}],

['require-await']: 'off',
['@typescript-eslint/require-await']: ["warn"],
  }
}
