import { typescriptConfig } from "eslint-config-gev"
// @ts-check
import { defineConfig } from "eslint/config"

export default defineConfig([
  // Ignore patterns
  {
    ignores: ["**/dist/**", "**/build/**", "**/node_modules/**"],
  },

  // Apply TypeScript config
  ...typescriptConfig,

  // Project-specific overrides
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.config.js"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Your custom rules here
    },
  },
])
