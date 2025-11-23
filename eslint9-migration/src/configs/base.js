import js from "@eslint/js"
import biomeConfig from "eslint-config-biome"
// @ts-check
import { defineConfig } from "eslint/config"

/**
 * Base configuration for all projects
 * Includes ESLint recommended rules and Biome compatibility
 */
export const baseConfig = defineConfig([
  // ESLint recommended rules
  js.configs.recommended,

  // Biome compatibility (disables conflicting rules)
  biomeConfig,

  // Base settings
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Node.js globals
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        // ES2021 globals
        globalThis: "readonly",
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
  },
])
