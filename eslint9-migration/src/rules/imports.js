// @ts-check

/**
 * Import/export related rules
 */
export const importsRules = {
  /**
   * Automatically removes unused imports. Saves time!
   *
   * https://github.com/sweepline/eslint-plugin-unused-imports
   */
  "unused-imports/no-unused-imports": "warn",

  "import/no-anonymous-default-export": "off",
  "import/no-unresolved": "error",

  /**
   * Enforce absolute imports instead of relative
   * https://github.com/MelvinVermeer/eslint-plugin-no-relative-import-paths
   */
  "no-relative-import-paths/no-relative-import-paths": [
    "warn",
    { allowSameFolder: true, rootDir: "src", prefix: "" },
  ],
}
