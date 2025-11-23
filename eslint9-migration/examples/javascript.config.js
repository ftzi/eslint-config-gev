import { javascriptConfig } from "eslint-config-gev/javascript"
// @ts-check
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    ignores: ["**/dist/**", "**/build/**", "**/node_modules/**"],
  },

  ...javascriptConfig,

  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      globals: {
        // Add your environment globals
        window: "readonly",
        document: "readonly",
      },
    },
    rules: {
      // Your custom rules
    },
  },
])
