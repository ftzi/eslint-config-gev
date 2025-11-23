// @ts-check

/**
 * React-specific ESLint rules
 */
export const reactRules = {
  "react/prop-types": "off",

  /**
   * Enable deps autofix. I've only had infinite loops once, and the autofix was off,
   * I just accept the suggestions and don't spend time analysing it. Rare to happen, easy to notice.
   *
   * https://github.com/facebook/react/issues/18235#issuecomment-898636301
   */
  "react-hooks/exhaustive-deps": [
    "warn",
    {
      enableDangerousAutofixThisMayCauseInfiniteLoops: true,
    },
  ],

  /** https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md */
  // Dropped it as it won't allow <></> to fit JSX.Element return.
  // "react/jsx-no-useless-fragment": ["warn", {"allowExpressions": true}],

  /**
   * From <A b={'c'}>d</A> to <A b="c">{'d'}<A/>
   *
   * Note that it always converts to double-quotes when changing,
   * so we use `jsx-quotes` rule for props and `quotes` rule for children.
   *
   * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
   */
  "react/jsx-curly-brace-presence": [
    "warn",
    { props: "never", children: "always" },
  ],

  /**
   * Prefer <> over <React.Fragment> if not using key=''.
   *
   * https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
   */
  "react/jsx-fragments": "warn",

  /** https://www.npmjs.com/package/eslint-plugin-react-refresh */
  "react-refresh/only-export-components": [
    "warn",
    // Only Vite supports this.
    { allowConstantExport: true },
  ],
}
