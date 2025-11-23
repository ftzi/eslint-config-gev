// @ts-check

/**
 * Stylistic rules using @stylistic/eslint-plugin
 */
export const stylisticRules = {
  "@stylistic/padding-line-between-statements": [
    "warn",
    // Line before return
    { blankLine: "always", prev: "*", next: "return" },
    // Line after vars block
    { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
    {
      blankLine: "any",
      prev: ["const", "let", "var"],
      next: ["const", "let", "var"],
    },
    // Line before function
    { blankLine: "always", prev: "*", next: "function" },
    // Line before type/interface (TS)
    { blankLine: "always", prev: "*", next: ["interface", "type"] },
    // Line after import block
    { blankLine: "always", prev: "import", next: "*" },
    { blankLine: "any", prev: "import", next: "import" },
    // Line before export block
    { blankLine: "always", prev: "*", next: "export" },
  ],

  /**
   * Newline after class members.
   * https://eslint.org/docs/latest/rules/lines-between-class-members
   */
  "lines-between-class-members": [
    "warn",
    "always",
    {
      exceptAfterSingleLine: true,
    },
  ],
}
