#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
// @ts-check
import { defineCommand, runMain } from "citty"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkgJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "package.json"), "utf8"),
)

const flavors = ["js", "javascript", "ts", "typescript", "react", "next"]
const flavorMap = {
  js: "javascript",
  javascript: "javascript",
  ts: "typescript",
  typescript: "typescript",
  react: "react",
  next: "next",
}

/**
 * @param {string} packageName
 * @param {string} version
 * @param {boolean} dev
 */
const addDependency = (packageName, version, dev = false) => {
  const packageJsonPath = "package.json"
  const packageJsonObj = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))

  const depKey = dev ? "devDependencies" : "dependencies"
  ;(packageJsonObj[depKey] ??= {})[packageName] = `^${version}`

  fs.writeFileSync(
    packageJsonPath,
    `${JSON.stringify(packageJsonObj, null, 2)}\n`,
  )
}

/**
 * @param {string} flavor
 * @returns {string}
 */
const getTemplate = (flavor) => {
  const normalized = flavorMap[/** @type {keyof typeof flavorMap} */ (flavor)]

  return `// @ts-check
import { defineConfig } from 'eslint/config';
import { ${normalized}Config } from 'eslint-config-gev/${normalized}';

export default defineConfig([
  {
    ignores: ['**/dist/**', '**/build/**', '**/node_modules/**']
  },

  ...${normalized}Config,

  // Your custom rules
  {
    rules: {
      // Add your overrides here
    }
  }
]);
`
}

/**
 * @param {string} flavor
 * @param {{ force: boolean }} options
 */
const setupEslint = (flavor, { force }) => {
  const filename = "eslint.config.js"

  if (fs.existsSync(filename) && !force) {
    throw new Error(
      `There is already an ${filename} in the directory! Use -f to overwrite.`,
    )
  }

  fs.writeFileSync(filename, getTemplate(flavor))

  addDependency("eslint", "9", true)
  addDependency("eslint-config-gev", pkgJson.version, true)

  console.log("✅ eslint.config.js created!")
  console.log("✅ eslint-config-gev was added as a devDependency!")
  console.log('📦 Run "npm/yarn/pnpm/bun install" to install it!')
}

const main = defineCommand({
  meta: {
    name: pkgJson.name,
    version: pkgJson.version,
    description: pkgJson.description,
  },
  args: {
    force: {
      type: "boolean",
      alias: "f",
      description: "Overwrites the existing 'eslint.config.js'",
    },
    flavor: {
      type: "positional",
      required: true,
      description: `Your project kind. One of these: ${flavors.join(", ")}`,
    },
  },
  run: ({ args: { flavor, force } }) => {
    if (!flavors.includes(flavor)) {
      throw new Error(`The flavor must be one of these: ${flavors.join(", ")}`)
    }

    setupEslint(flavor, { force: force ?? false })
  },
})

runMain(main)
