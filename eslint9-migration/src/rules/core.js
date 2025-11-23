// @ts-check

/**
 * Core ESLint rules that apply to all JavaScript/TypeScript code
 */
export const coreRules = {
  /** ignoreRestSiblings: Ignore {unusedProp, ...rest} */
  "no-unused-vars": ["warn", { ignoreRestSiblings: true }],

  /** https://eslint.org/docs/rules/require-await */
  "require-await": "warn",

  /**
   * Disallow Number Literals That Lose Precision
   * https://eslint.org/docs/rules/no-loss-of-precision
   */
  "no-loss-of-precision": "error",

  /** Warn about unreachable code. */
  "no-unreachable-loop": "warn",

  /** Disable error about empty functions. This is good to allow .catch(() => {}) */
  "no-empty-function": "off",

  /**
   * This is kinda useless. It's more of a pain, actually:
   * If you are writting a function like f({}: Props) to later fill the object with the desired props,
   * it will mark it as an error.
   * https://eslint.org/docs/rules/no-empty-pattern
   */
  "no-empty-pattern": "off",

  /**
   * Space after comment.
   * https://eslint.org/docs/rules/spaced-comment
   */
  "spaced-comment": [
    "warn",
    "always",
    { exceptions: ["-", "+"], markers: ["/"] },
  ],

  /**
   * Simplify objects.
   * https://eslint.org/docs/rules/object-shorthand
   */
  "object-shorthand": ["warn", "always"],

  /**
   * Disallow `throw 4` and `throw 'error'`. It will be required to always throw an Error-like object,
   * such as `throw new Error('error')`.
   *
   * https://eslint.org/docs/latest/rules/no-throw-literal
   */
  "no-throw-literal": "warn",

  /**
   * Remove wrapping braces if they can be omitted
   * https://eslint.org/docs/latest/rules/arrow-body-style
   */
  "arrow-body-style": "warn",

  /**
   * TS handles this, it raised false-positives sometimes.
   * https://github.com/Chatie/eslint-config/issues/45#issuecomment-1003990077
   */
  "no-undef": "off",
}
