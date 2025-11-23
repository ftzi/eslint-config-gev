import { reactConfig } from "eslint-config-gev/react"
// @ts-check
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    ignores: ["**/dist/**", "**/build/**", "**/node_modules/**"],
  },

  ...reactConfig,

  {
    files: ["**/*.tsx", "**/*.jsx"],
    rules: {
      // Your custom React rules
    },
  },
])
