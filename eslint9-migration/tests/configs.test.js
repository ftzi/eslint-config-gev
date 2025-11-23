// @ts-check
import { describe, expect, test } from "bun:test"
// Note: nextjsConfig temporarily disabled due to eslint-config-next ESLint 9 compatibility issues
// import { nextjsConfig } from '../src/index.js';
import path from "node:path"
import { fileURLToPath } from "node:url"
import { ESLint } from "eslint"
import {
  javascriptConfig,
  reactConfig,
  typescriptConfig,
} from "../src/index.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

describe("ESLint Configurations", () => {
  test("JavaScript config loads without errors", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: javascriptConfig,
    })

    const results = await eslint.lintFiles([
      path.join(__dirname, "fixtures/js-sample.js"),
    ])

    expect(results).toBeDefined()
    expect(Array.isArray(results)).toBe(true)
  })

  test("TypeScript config loads without errors", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: typescriptConfig,
    })

    const results = await eslint.lintFiles([
      path.join(__dirname, "fixtures/ts-sample.ts"),
    ])

    expect(results).toBeDefined()
    expect(Array.isArray(results)).toBe(true)
  })

  test("React config loads without errors", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: reactConfig,
    })

    const results = await eslint.lintFiles([
      path.join(__dirname, "fixtures/react-sample.tsx"),
    ])

    expect(results).toBeDefined()
    expect(Array.isArray(results)).toBe(true)
  })

  // Next.js config temporarily disabled - waiting for eslint-config-next ESLint 9 compatibility
  // test('Next.js config loads without errors', async () => {
  //   const eslint = new ESLint({
  //     overrideConfigFile: true,
  //     overrideConfig: nextjsConfig,
  //   });

  //   const results = await eslint.lintFiles([path.join(__dirname, 'fixtures/react-sample.tsx')]);

  //   expect(results).toBeDefined();
  //   expect(Array.isArray(results)).toBe(true);
  // });

  test("All configs are valid flat config arrays", () => {
    expect(Array.isArray(javascriptConfig)).toBe(true)
    expect(Array.isArray(typescriptConfig)).toBe(true)
    expect(Array.isArray(reactConfig)).toBe(true)
    // expect(Array.isArray(nextjsConfig)).toBe(true); // Disabled - Next.js config compatibility issue
  })

  test("TypeScript rules properly extend JavaScript rules", () => {
    expect(typescriptConfig.length).toBeGreaterThan(javascriptConfig.length)
  })

  test("React config properly extends TypeScript config", () => {
    expect(reactConfig.length).toBeGreaterThan(typescriptConfig.length)
  })
})
