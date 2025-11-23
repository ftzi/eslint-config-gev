// @ts-check

/**
 * Main entry point for eslint-config-gev
 * ESLint 9 flat config exports
 *
 * @packageDocumentation
 */

export { baseConfig } from "./configs/base.js"
export { javascriptConfig } from "./configs/javascript.js"
export { typescriptConfig } from "./configs/typescript.js"
export { reactConfig } from "./configs/react.js"
export { nextjsConfig } from "./configs/next.js"

// Default export is TypeScript config (most common use case)
export { typescriptConfig as default } from "./configs/typescript.js"
