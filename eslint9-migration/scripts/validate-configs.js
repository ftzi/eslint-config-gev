#!/usr/bin/env node
// @ts-check

/**
 * Validates that all ESLint configurations are properly structured
 * and can be loaded without errors.
 */

import { ESLint } from "eslint"
import {
  javascriptConfig,
  nextjsConfig,
  reactConfig,
  typescriptConfig,
} from "../src/index.js"

const configs = {
  JavaScript: javascriptConfig,
  TypeScript: typescriptConfig,
  React: reactConfig,
  "Next.js": nextjsConfig,
}

console.log("Validating ESLint configurations...\n")

let hasErrors = false

for (const [name, config] of Object.entries(configs)) {
  try {
    // Check if it's an array
    if (!Array.isArray(config)) {
      throw new Error("Config is not an array")
    }

    // Try to create an ESLint instance with the config
    new ESLint({
      overrideConfigFile: true,
      overrideConfig: config,
    })

    console.log(`✅ ${name} config is valid`)
  } catch (error) {
    console.error(`❌ ${name} config has errors:`)
    console.error(error)
    hasErrors = true
  }
}

if (hasErrors) {
  console.error("\n❌ Some configurations have errors")
  process.exit(1)
} else {
  console.log("\n✅ All configurations are valid!")
}
