import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
// @ts-check
import { defineConfig } from "eslint/config"
import { reactRules } from "../rules/react.js"
import { typescriptConfig } from "./typescript.js"

/**
 * React configuration
 * Extends TypeScript config with React-specific rules and plugins
 */
export const reactConfig = defineConfig([
  // Extend TypeScript config
  ...typescriptConfig,

  // React recommended
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],

  {
    files: ["**/*.jsx", "**/*.tsx"],

    plugins: {
      react: react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactRules,
    },
  },
])
