import { nextjsConfig } from "eslint-config-gev/next"
// @ts-check
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    ignores: ["**/.next/**", "**/out/**", "**/node_modules/**"],
  },

  ...nextjsConfig,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
