// @ts-check

/**
 * Automatically disables base rules that have TypeScript equivalents
 * and maps them to their @typescript-eslint/ versions
 *
 * This prevents rule conflicts when using TypeScript ESLint with base ESLint rules.
 */
export function getTsExtensionRules() {
  return {
    // These rules are handled by TS equivalents
    "lines-between-class-members": "off",
    "no-throw-literal": "off",
    "no-unused-vars": "off",
    "require-await": "off",
  }
}
