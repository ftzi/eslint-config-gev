import stylistic from "@stylistic/eslint-plugin"
import importPlugin from "eslint-plugin-import"
import jsdoc from "eslint-plugin-jsdoc"
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths"
import preferArrowFunctions from "eslint-plugin-prefer-arrow-functions"
import unusedImports from "eslint-plugin-unused-imports"
// @ts-check
import { defineConfig } from "eslint/config"
import { coreRules } from "../rules/core.js"
import { importsRules } from "../rules/imports.js"
import { jsdocRules } from "../rules/jsdoc.js"
import { stylisticRules } from "../rules/stylistic.js"
import { baseConfig } from "./base.js"

/**
 * JavaScript configuration
 * Extends base config with JS-specific rules and plugins
 */
export const javascriptConfig = defineConfig([
  // Extend base config
  ...baseConfig,

  // JSDoc recommended
  jsdoc.configs["flat/recommended"],

  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],

    plugins: {
      "unused-imports": unusedImports,
      "no-relative-import-paths": noRelativeImportPaths,
      jsdoc: jsdoc,
      "prefer-arrow-functions": preferArrowFunctions,
      "@stylistic": stylistic,
      import: importPlugin,
    },

    settings: {
      "import/resolver": {
        node: true,
      },
    },

    rules: {
      ...coreRules,
      ...stylisticRules,
      ...importsRules,
      ...jsdocRules,

      /**
       * https://github.com/JamieMason/eslint-plugin-prefer-arrow-functions
       */
      "prefer-arrow-functions/prefer-arrow-functions": [
        "warn",
        {
          allowNamedFunctions: true,
        },
      ],
    },
  },
])
