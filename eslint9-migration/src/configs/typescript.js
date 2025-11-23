import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
// @ts-check
import { defineConfig } from "eslint/config"
import { typescriptRules } from "../rules/typescript.js"
import { getTsExtensionRules } from "../utils/ts-extensions.js"
import { javascriptConfig } from "./javascript.js"

/**
 * TypeScript configuration
 * Extends JavaScript config with TypeScript-specific rules and type checking
 */
export const typescriptConfig = defineConfig([
  // Extend JavaScript config
  ...javascriptConfig,

  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
    },

    rules: {
      // Disable base rules that are extended by TS rules
      ...getTsExtensionRules(),

      // TypeScript-specific rules
      ...tsPlugin.configs["eslint-recommended"].overrides[0].rules,
      ...tsPlugin.configs["strict-type-checked"].rules,
      ...typescriptRules,
    },
  },
])
