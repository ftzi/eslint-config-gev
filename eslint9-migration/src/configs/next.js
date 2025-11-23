// @ts-check
import { defineConfig } from "eslint/config"
import { reactConfig } from "./react.js"
// NOTE: eslint-config-next is temporarily disabled due to ESLint 9 compatibility issues
// It uses @rushstack/eslint-patch which is not compatible with ESLint 9
// Waiting for Next.js to update: https://github.com/vercel/next.js/issues/64114
// import nextConfig from 'eslint-config-next';

/**
 * Next.js configuration
 * Extends React config with Next.js-specific rules
 *
 * NOTE: This is a placeholder until eslint-config-next supports ESLint 9
 * Currently just extends React config with Next.js-friendly settings
 */
export const nextjsConfig = defineConfig([
  // Extend React config
  ...reactConfig,

  // TODO: Add Next.js config when available
  // ...nextConfig,

  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    rules: {
      // Next.js handles React import
      "react/react-in-jsx-scope": "off",
    },
  },
])
