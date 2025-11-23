# ESLint 9 Flat Config Migration Plan

## Table of Contents
1. [Overview](#overview)
2. [Current State Analysis](#current-state-analysis)
3. [Plugin Compatibility Status](#plugin-compatibility-status)
4. [Migration Strategy](#migration-strategy)
5. [New Directory Structure](#new-directory-structure)
6. [Dependencies Update](#dependencies-update)
7. [Configuration Files](#configuration-files)
8. [Testing Strategy](#testing-strategy)
9. [Rollout Plan](#rollout-plan)

---

## Overview

This document outlines the complete migration of `eslint-config-gev` from ESLint 8 with legacy `.eslintrc` format to ESLint 9 with the new flat config format (`eslint.config.js`).

### Key Changes
- **ESLint version**: 8.56.0 → 9.x (latest)
- **Config format**: `.eslintrc.js` (legacy) → `eslint.config.js` (flat config)
- **TypeScript ESLint**: v7 → v8
- **Removed**: React Native support (as requested)
- **Removed**: `@rushstack/eslint-patch` (no longer needed in flat config)
- **Architecture**: ESM-first with proper plugin imports

### Benefits
- Simpler, more intuitive configuration format
- Better performance and faster startup
- First-class TypeScript support
- No need for module resolution patches
- Better IDE integration
- Future-proof (legacy format deprecated)

---

## Current State Analysis

### Current Package Structure
```
eslint-config-gev/
├── index.js              # Main entry (points to ts.js)
├── js.js                 # JavaScript base config
├── ts.js                 # TypeScript config
├── ts-extensions.js      # Auto-generated TS rule extensions
├── react.js              # React config
├── react-native.js       # React Native config (TO BE REMOVED)
├── next.js               # Next.js config
├── shared-react.js       # Shared React rules
├── examples/             # Example configurations
├── scripts/              # Build scripts
│   └── makeTsExtensions.ts
└── tests/                # Test files
```

### Current Dependencies
```json
{
  "@rushstack/eslint-patch": "^1.10.4",
  "@stylistic/eslint-plugin": "2.12.1",
  "@typescript-eslint/eslint-plugin": "7.10.0",
  "@typescript-eslint/parser": "7.10.0",
  "citty": "0.1.6",
  "eslint": "8.56.0",
  "eslint-config-biome": "^1.9.4",
  "eslint-config-next": "^15.1.2",
  "eslint-import-resolver-typescript": "^3.7.0",
  "eslint-plugin-import": "^2.31.0",
  "eslint-plugin-jsdoc": "48.2.6",
  "eslint-plugin-no-autofix": "2.1.0",
  "eslint-plugin-no-relative-import-paths": "1.5.5",
  "eslint-plugin-prefer-arrow-functions": "3.4.1",
  "eslint-plugin-react": "7.37.2",
  "eslint-plugin-react-hooks": "^5.1.0",
  "eslint-plugin-react-native": "4.1.0",
  "eslint-plugin-react-refresh": "^0.4.16",
  "eslint-plugin-require-extensions": "0.1.3",
  "eslint-plugin-unused-imports": "3.2.0"
}
```

---

## Plugin Compatibility Status

### ✅ Fully Compatible with ESLint 9 Flat Config

| Plugin | Current Version | Target Version | Notes |
|--------|----------------|----------------|-------|
| `@typescript-eslint/*` | 7.10.0 | 8.x (latest) | Full flat config support in v8+ |
| `@stylistic/eslint-plugin` | 2.12.1 | 2.x (latest) | Native flat config support |
| `eslint-plugin-import` | 2.31.0 | 2.31.0+ | Flat config supported since v2.30.0 |
| `eslint-plugin-jsdoc` | 48.2.6 | Latest | Has `flat/recommended` presets |
| `eslint-plugin-react` | 7.37.2 | 7.37.2+ | ESLint 9 support since v7.35.0 |
| `eslint-plugin-react-hooks` | 5.1.0 | 5.1.0+ | Flat config compatible |
| `eslint-plugin-react-refresh` | 0.4.16 | 0.4.16+ | Flat config compatible |
| `eslint-plugin-unused-imports` | 3.2.0 | 4.x (latest) | v4.1+ for ESLint 9 |
| `eslint-plugin-no-relative-import-paths` | 1.5.5 | 1.6.x+ | Flat config supported |
| `eslint-plugin-prefer-arrow-functions` | 3.4.1 | 3.4.1+ | Has `configs.all` for flat config |
| `eslint-config-biome` | 1.9.4 | 1.9.4+ | Flat config compatible |
| `eslint-config-next` | 15.1.2 | 15.1.2+ | Flat config supported |
| `eslint-import-resolver-typescript` | 3.7.0 | 3.7.0+ | Compatible with flat config |

### ⚠️ Problematic Plugins

| Plugin | Status | Action |
|--------|--------|--------|
| `eslint-plugin-no-autofix` | Limited/unclear support | Move to deprecated list, use native ESLint features |
| `eslint-plugin-require-extensions` | Outdated (3 years) | Move to deprecated list, evaluate alternatives |

### ❌ Removed Plugins

| Plugin | Reason |
|--------|--------|
| `eslint-plugin-react-native` | No longer needed per user request |
| `@rushstack/eslint-patch` | Not needed with flat config |

---

## Migration Strategy

### Phase 1: New Directory Setup
Create a new directory structure to keep migration clean and isolated:

```
eslint-config-gev/
├── [existing files...]
└── eslint9-migration/        # NEW MIGRATION DIRECTORY
    ├── package.json
    ├── src/
    │   ├── configs/
    │   │   ├── base.js           # Base ESLint config
    │   │   ├── javascript.js     # JavaScript config
    │   │   ├── typescript.js     # TypeScript config
    │   │   ├── react.js          # React config
    │   │   └── next.js           # Next.js config
    │   ├── rules/
    │   │   ├── javascript.js     # JS-specific rules
    │   │   ├── typescript.js     # TS-specific rules
    │   │   ├── stylistic.js      # Stylistic rules
    │   │   ├── imports.js        # Import rules
    │   │   └── react.js          # React rules
    │   └── index.js              # Main entry point
    ├── examples/
    │   ├── typescript.js
    │   ├── react.js
    │   ├── next.js
    │   └── javascript.js
    ├── tests/
    │   └── configs.test.js
    ├── scripts/
    │   └── generate-ts-extensions.js
    └── README.md
```

### Phase 2: Configuration Architecture

#### New Flat Config Structure with Type Safety
Flat config uses an array of configuration objects, and ESLint 9 provides type-safe helpers.

**Before (Legacy):**
```javascript
module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  rules: { /* ... */ }
}
```

**After (Flat Config with Type Safety):**
```javascript
// @ts-check - Enables TypeScript checking in JavaScript files
import { defineConfig } from 'eslint/config';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { /* ... */ }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: { /* ... */ }
  }
]);
```

#### Type Safety Options

ESLint 9 provides multiple approaches for type-safe configurations:

**Option 1: `defineConfig()` from ESLint (Recommended)**
```javascript
// @ts-check
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Automatically typed and validated
  { files: ['**/*.js'], rules: { /* autocomplete works here */ } }
]);
```

**Option 2: JSDoc with Types**
```javascript
// @ts-check
/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.js'], rules: { /* ... */ } }
];
```

**Option 3: Native TypeScript**
```typescript
// eslint.config.ts
import type { Linter } from 'eslint';

const config: Linter.Config[] = [
  { files: ['**/*.ts'], rules: { /* ... */ } }
];

export default config;
```

For this project, we'll use **Option 1 (defineConfig)** as it provides:
- ✅ Native ESLint support (no additional deps)
- ✅ Automatic flattening of nested configs
- ✅ Full TypeScript IntelliSense
- ✅ Validation at development time
- ✅ Simplified config with `extends` support

---

## New Directory Structure

### Proposed File Organization

```
eslint9-migration/
├── package.json                  # New package.json with ESLint 9 deps
├── README.md                     # Updated documentation
├── LICENSE                       # Copy from parent
├── bin.js                        # Updated CLI tool
├── src/
│   ├── index.js                  # Main exports
│   ├── configs/
│   │   ├── base.js               # Core ESLint rules
│   │   ├── javascript.js         # JavaScript preset
│   │   ├── typescript.js         # TypeScript preset
│   │   ├── react.js              # React preset
│   │   └── next.js               # Next.js preset
│   ├── rules/
│   │   ├── core.js               # Core ESLint rules
│   │   ├── typescript.js         # TypeScript-specific rules
│   │   ├── stylistic.js          # Stylistic rules
│   │   ├── imports.js            # Import/export rules
│   │   ├── jsdoc.js              # JSDoc rules
│   │   └── react.js              # React rules
│   └── utils/
│       ├── ts-extensions.js      # TS extension rule mapper
│       └── file-patterns.js      # Common file patterns
├── examples/
│   ├── javascript.config.js
│   ├── typescript.config.js
│   ├── react.config.js
│   └── next.config.js
├── tests/
│   ├── fixtures/
│   │   ├── js-sample.js
│   │   ├── ts-sample.ts
│   │   └── react-sample.tsx
│   └── configs.test.js
└── scripts/
    ├── generate-ts-extensions.js
    └── validate-configs.js
```

---

## Dependencies Update

### New package.json

```json
{
  "name": "eslint-config-gev",
  "version": "5.0.0",
  "description": "Curated ESLint 9 configs for TS, JS, Next, and React projects",
  "author": "SrBrahma",
  "type": "module",
  "main": "./src/index.js",
  "bin": "./bin.js",
  "exports": {
    ".": "./src/index.js",
    "./javascript": "./src/configs/javascript.js",
    "./typescript": "./src/configs/typescript.js",
    "./react": "./src/configs/react.js",
    "./next": "./src/configs/next.js"
  },
  "scripts": {
    "format": "biome check --unsafe --fix . && eslint --fix .",
    "format:check": "biome check --unsafe . && eslint .",
    "pre-commit": "bun format && bun run generate-extensions && bun test && git add -A",
    "prepare": "bunx husky",
    "generate-extensions": "bun scripts/generate-ts-extensions.js",
    "test": "bun test",
    "test:watch": "bun test --watch",
    "validate": "bun scripts/validate-configs.js",
    "update-deps": "bunx npm-check-updates -i"
  },
  "files": [
    "src/**/*",
    "examples/**/*",
    "bin.js"
  ],
  "license": "MIT",
  "homepage": "https://github.com/SrBrahma/eslint-config-gev#readme",
  "keywords": [
    "gev",
    "eslint",
    "eslint-config",
    "eslint9",
    "flat-config",
    "typescript",
    "react",
    "javascript"
  ],
  "peerDependencies": {
    "eslint": "^9.0.0"
  },
  "dependencies": {
    "@stylistic/eslint-plugin": "^2.12.1",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "citty": "^0.1.6",
    "eslint-config-biome": "^1.9.4",
    "eslint-config-next": "^15.1.2",
    "eslint-import-resolver-typescript": "^3.7.0",
    "eslint-plugin-import": "^2.31.0",
    "eslint-plugin-jsdoc": "^50.0.0",
    "eslint-plugin-no-relative-import-paths": "^1.6.0",
    "eslint-plugin-prefer-arrow-functions": "^3.4.1",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "eslint-plugin-unused-imports": "^4.1.0"
  },
  "devDependencies": {
    "@biomejs/biome": "^1.9.4",
    "@types/bun": "^1.1.14",
    "eslint": "^9.0.0",
    "husky": "^9.1.7"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Removed Dependencies
- `@rushstack/eslint-patch` - Not needed in flat config
- `eslint-plugin-react-native` - React Native support removed
- `eslint-plugin-no-autofix` - Deprecated, unclear flat config support
- `eslint-plugin-require-extensions` - Outdated, 3 years old

### Updated Dependencies
- `eslint`: 8.56.0 → ^9.0.0
- `@typescript-eslint/eslint-plugin`: 7.10.0 → ^8.0.0
- `@typescript-eslint/parser`: 7.10.0 → ^8.0.0
- `eslint-plugin-jsdoc`: 48.2.6 → ^50.0.0
- `eslint-plugin-unused-imports`: 3.2.0 → ^4.1.0
- `eslint-plugin-no-relative-import-paths`: 1.5.5 → ^1.6.0

---

## Configuration Files

### 1. Base Configuration (`src/configs/base.js`)

```javascript
// @ts-check
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import biomeConfig from 'eslint-config-biome';

export const baseConfig = defineConfig([
  // ESLint recommended rules
  js.configs.recommended,

  // Biome compatibility (disables conflicting rules)
  biomeConfig,

  // Base settings
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        // ES2021 globals
        globalThis: 'readonly',
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn'
    }
  }
]);
```

### 2. JavaScript Configuration (`src/configs/javascript.js`)

```javascript
// @ts-check
import { defineConfig } from 'eslint/config';
import { baseConfig } from './base.js';
import { coreRules } from '../rules/core.js';
import { stylisticRules } from '../rules/stylistic.js';
import { importsRules } from '../rules/imports.js';
import { jsdocRules } from '../rules/jsdoc.js';
import unusedImports from 'eslint-plugin-unused-imports';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import jsdoc from 'eslint-plugin-jsdoc';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export const javascriptConfig = defineConfig([
  // Extend base config
  ...baseConfig,

  // JSDoc recommended
  jsdoc.configs['flat/recommended'],

  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],

    plugins: {
      'unused-imports': unusedImports,
      'no-relative-import-paths': noRelativeImportPaths,
      'jsdoc': jsdoc,
      'prefer-arrow-functions': preferArrowFunctions,
      '@stylistic': stylistic,
      'import': importPlugin,
    },

    settings: {
      'import/resolver': {
        node: true,
      },
    },

    rules: {
      ...coreRules,
      ...stylisticRules,
      ...importsRules,
      ...jsdocRules,
    }
  }
]);
```

### 3. TypeScript Configuration (`src/configs/typescript.js`)

```javascript
// @ts-check
import { defineConfig } from 'eslint/config';
import { javascriptConfig } from './javascript.js';
import { typescriptRules } from '../rules/typescript.js';
import { getTsExtensionRules } from '../utils/ts-extensions.js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export const typescriptConfig = defineConfig([
  // Extend JavaScript config
  ...javascriptConfig,

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
    },

    rules: {
      // Disable base rules that are extended by TS rules
      ...getTsExtensionRules(),

      // TypeScript-specific rules
      ...tsPlugin.configs['eslint-recommended'].overrides[0].rules,
      ...tsPlugin.configs['strict-type-checked'].rules,
      ...typescriptRules,
    }
  }
]);
```

### 4. React Configuration (`src/configs/react.js`)

```javascript
// @ts-check
import { defineConfig } from 'eslint/config';
import { typescriptConfig } from './typescript.js';
import { reactRules } from '../rules/react.js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export const reactConfig = defineConfig([
  // Extend TypeScript config
  ...typescriptConfig,

  // React recommended
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],

  {
    files: ['**/*.jsx', '**/*.tsx'],

    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactRules,
    }
  }
]);
```

### 5. Next.js Configuration (`src/configs/next.js`)

```javascript
// @ts-check
import { defineConfig } from 'eslint/config';
import { reactConfig } from './react.js';
import nextConfig from 'eslint-config-next';

export const nextjsConfig = defineConfig([
  // Extend React config
  ...reactConfig,

  // Next.js config (it exports flat config compatible format)
  ...nextConfig,

  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
      // Next.js handles React import
      'react/react-in-jsx-scope': 'off',
    }
  }
]);
```

### 6. Main Export (`src/index.js`)

```javascript
export { baseConfig } from './configs/base.js';
export { javascriptConfig } from './configs/javascript.js';
export { typescriptConfig } from './configs/typescript.js';
export { reactConfig } from './configs/react.js';
export { nextjsConfig } from './configs/next.js';

// Default export is TypeScript config
export { typescriptConfig as default } from './configs/typescript.js';
```

---

## Rules Organization

### Core Rules (`src/rules/core.js`)

```javascript
export const coreRules = {
  // Unused variables with rest siblings support
  'no-unused-vars': ['warn', { ignoreRestSiblings: true }],

  // Async/await
  'require-await': 'warn',

  // Precision
  'no-loss-of-precision': 'error',

  // Code quality
  'no-unreachable-loop': 'warn',
  'no-empty-function': 'off',
  'no-empty-pattern': 'off',
  'no-undef': 'off', // TypeScript handles this

  // Comments
  'spaced-comment': [
    'warn',
    'always',
    { exceptions: ['-', '+'], markers: ['/'] }
  ],

  // Objects
  'object-shorthand': ['warn', 'always'],

  // Error handling
  'no-throw-literal': 'warn',

  // Arrow functions
  'arrow-body-style': 'warn',
};
```

### TypeScript Rules (`src/rules/typescript.js`)

```javascript
export const typescriptRules = {
  // Allow explicit types
  '@typescript-eslint/no-inferrable-types': 'off',

  // TS comments
  '@typescript-eslint/ban-ts-comment': 'off',

  // Promises
  '@typescript-eslint/no-floating-promises': 'warn',

  // Templates
  '@typescript-eslint/restrict-template-expressions': 'off',

  // Methods
  '@typescript-eslint/unbound-method': 'off',

  // Require
  '@typescript-eslint/no-var-requires': 'off',

  // Promises in void context
  '@typescript-eslint/no-misused-promises': [
    'error',
    { checksVoidReturn: false }
  ],

  // RegExp
  '@typescript-eslint/prefer-regexp-exec': 'off',

  // Empty
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-empty-interface': 'off',

  // Conditions
  '@typescript-eslint/no-unnecessary-condition': [
    'warn',
    { allowConstantLoopConditions: true }
  ],

  // Operators
  '@typescript-eslint/restrict-plus-operands': 'off',

  // Boolean comparisons
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': [
    'warn',
    { allowComparingNullableBooleansToTrue: false }
  ],

  // Safety (stricter)
  '@typescript-eslint/no-unsafe-assignment': 'error',
  '@typescript-eslint/no-unsafe-return': 'error',
  '@typescript-eslint/no-unsafe-member-access': 'error',
  '@typescript-eslint/no-unsafe-argument': 'error',
  '@typescript-eslint/no-unsafe-call': 'error',
  '@typescript-eslint/no-non-null-assertion': 'error',

  // Array type preference
  '@typescript-eslint/array-type': ['warn', { default: 'generic' }],

  // String methods
  '@typescript-eslint/prefer-string-starts-ends-with': 'warn',

  // Switch exhaustiveness
  '@typescript-eslint/switch-exhaustiveness-check': 'warn',
};
```

### Stylistic Rules (`src/rules/stylistic.js`)

```javascript
export const stylisticRules = {
  '@stylistic/padding-line-between-statements': [
    'warn',
    // Line before return
    { blankLine: 'always', prev: '*', next: 'return' },
    // Line after vars block
    { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
    {
      blankLine: 'any',
      prev: ['const', 'let', 'var'],
      next: ['const', 'let', 'var']
    },
    // Line before function
    { blankLine: 'always', prev: '*', next: 'function' },
    // Line before type/interface (TS)
    { blankLine: 'always', prev: '*', next: ['interface', 'type'] },
    // Line after import block
    { blankLine: 'always', prev: 'import', next: '*' },
    { blankLine: 'any', prev: 'import', next: 'import' },
    // Line before export block
    { blankLine: 'always', prev: '*', next: 'export' }
  ],

  'lines-between-class-members': [
    'warn',
    'always',
    { exceptAfterSingleLine: true }
  ],
};
```

### Import Rules (`src/rules/imports.js`)

```javascript
export const importsRules = {
  // Unused imports
  'unused-imports/no-unused-imports': 'warn',

  // Import resolution
  'import/no-anonymous-default-export': 'off',
  'import/no-unresolved': 'error',

  // Relative imports
  'no-relative-import-paths/no-relative-import-paths': [
    'warn',
    { allowSameFolder: true, rootDir: 'src', prefix: '' }
  ],
};
```

### JSDoc Rules (`src/rules/jsdoc.js`)

```javascript
export const jsdocRules = {
  'jsdoc/require-jsdoc': 'off',
  'jsdoc/require-param': 'off',
  'jsdoc/require-returns': 'off',
};
```

### React Rules (`src/rules/react.js`)

```javascript
export const reactRules = {
  'react/prop-types': 'off',

  // Hooks deps
  'react-hooks/exhaustive-deps': [
    'warn',
    {
      enableDangerousAutofixThisMayCauseInfiniteLoops: true
    }
  ],

  // JSX
  'react/jsx-curly-brace-presence': [
    'warn',
    { props: 'never', children: 'always' }
  ],

  'react/jsx-fragments': 'warn',

  // React Refresh
  'react-refresh/only-export-components': [
    'warn',
    { allowConstantExport: true }
  ],
};
```

### TypeScript Extensions Utility (`src/utils/ts-extensions.js`)

```javascript
/**
 * Automatically disables base rules that have TypeScript equivalents
 * and maps them to their @typescript-eslint/ versions
 */
export function getTsExtensionRules() {
  return {
    // These rules are handled by TS equivalents
    'lines-between-class-members': 'off',
    'no-throw-literal': 'off',
    'no-unused-vars': 'off',
    'require-await': 'off',
  };
}
```

---

## Example Configurations

### TypeScript Project (`examples/typescript.config.js`)

```javascript
// @ts-check
import { defineConfig } from 'eslint/config';
import { typescriptConfig } from 'eslint-config-gev';

export default defineConfig([
  // Ignore patterns
  {
    ignores: ['**/dist/**', '**/build/**', '**/node_modules/**']
  },

  // Apply TypeScript config
  ...typescriptConfig,

  // Project-specific overrides
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.config.js'],
        },
        tsconfigRootDir: import.meta.dirname,
      }
    },
    rules: {
      // Your custom rules here
    }
  }
]);
```

### React Project (`examples/react.config.js`)

```javascript
// @ts-check
import { defineConfig } from 'eslint/config';
import { reactConfig } from 'eslint-config-gev/react';

export default defineConfig([
  {
    ignores: ['**/dist/**', '**/build/**', '**/node_modules/**']
  },

  ...reactConfig,

  {
    files: ['**/*.tsx', '**/*.jsx'],
    rules: {
      // Your custom React rules
    }
  }
]);
```

### Next.js Project (`examples/next.config.js`)

```javascript
// @ts-check
import { defineConfig } from 'eslint/config';
import { nextjsConfig } from 'eslint-config-gev/next';

export default defineConfig([
  {
    ignores: ['**/.next/**', '**/out/**', '**/node_modules/**']
  },

  ...nextjsConfig,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      }
    }
  }
]);
```

### JavaScript Project (`examples/javascript.config.js`)

```javascript
// @ts-check
import { defineConfig } from 'eslint/config';
import { javascriptConfig } from 'eslint-config-gev/javascript';

export default defineConfig([
  {
    ignores: ['**/dist/**', '**/build/**', '**/node_modules/**']
  },

  ...javascriptConfig,

  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      globals: {
        // Add your environment globals
        window: 'readonly',
        document: 'readonly',
      }
    },
    rules: {
      // Your custom rules
    }
  }
]);
```

---

## Type Safety Setup for Development

### TypeScript Configuration (`tsconfig.json`)

Add a `tsconfig.json` file to enable type checking during development:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "allowJs": true,
    "checkJs": true,
    "noEmit": true,
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "types": ["node", "bun"]
  },
  "include": [
    "src/**/*",
    "examples/**/*",
    "scripts/**/*",
    "tests/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "build"
  ]
}
```

### Type Checking Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "typecheck:watch": "tsc --noEmit --watch",
    "lint": "eslint . --fix",
    "lint:check": "eslint .",
    "check": "bun run typecheck && bun run lint:check"
  }
}
```

### VSCode Settings (`.vscode/settings.json`)

Ensure TypeScript checking is enabled in VSCode:

```json
{
  "javascript.validate.enable": true,
  "typescript.validate.enable": true,
  "js/ts.implicitProjectConfig.checkJs": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### Benefits of Type-Safe Configs

With `// @ts-check` and `defineConfig()`:

1. **IntelliSense**: Get autocomplete for all ESLint options
2. **Type Errors**: Catch mistakes before runtime
3. **Documentation**: Hover to see rule documentation
4. **Refactoring**: Safe renaming and refactoring
5. **Validation**: Ensure rule names and options are correct

### Example Type Error Detection

```javascript
// @ts-check
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    // ❌ TypeScript will catch this typo
    rulez: {  // Error: Object literal may only specify known properties
      'no-console': 'error'
    }
  }
]);
```

```javascript
// @ts-check
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.js'],
    rules: {
      // ✅ Autocomplete shows all available rules
      'no-console': 'error',  // Hover shows documentation
      'no-unused-vars': ['warn', {
        // ✅ Autocomplete shows all options
        ignoreRestSiblings: true
      }]
    }
  }
]);
```

---

## Testing Strategy

### Test Structure (`tests/configs.test.js`)

```javascript
import { test, expect, describe } from 'bun:test';
import { ESLint } from 'eslint';
import { javascriptConfig, typescriptConfig, reactConfig, nextjsConfig } from '../src/index.js';
import path from 'node:path';

describe('ESLint Configurations', () => {
  test('JavaScript config loads without errors', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: javascriptConfig,
    });

    const results = await eslint.lintFiles(['tests/fixtures/js-sample.js']);
    expect(results).toBeDefined();
  });

  test('TypeScript config loads without errors', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: typescriptConfig,
    });

    const results = await eslint.lintFiles(['tests/fixtures/ts-sample.ts']);
    expect(results).toBeDefined();
  });

  test('React config loads without errors', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: reactConfig,
    });

    const results = await eslint.lintFiles(['tests/fixtures/react-sample.tsx']);
    expect(results).toBeDefined();
  });

  test('Next.js config loads without errors', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: nextjsConfig,
    });

    const results = await eslint.lintFiles(['tests/fixtures/react-sample.tsx']);
    expect(results).toBeDefined();
  });

  test('All configs are valid flat config arrays', () => {
    expect(Array.isArray(javascriptConfig)).toBe(true);
    expect(Array.isArray(typescriptConfig)).toBe(true);
    expect(Array.isArray(reactConfig)).toBe(true);
    expect(Array.isArray(nextjsConfig)).toBe(true);
  });

  test('TypeScript rules properly extend JavaScript rules', () => {
    expect(typescriptConfig.length).toBeGreaterThan(javascriptConfig.length);
  });
});
```

### Test Fixtures

Create minimal test files in `tests/fixtures/`:

- `js-sample.js` - Basic JavaScript file
- `ts-sample.ts` - Basic TypeScript file
- `react-sample.tsx` - Basic React component

---

## Updated CLI Tool (`bin.js`)

```javascript
#!/usr/bin/env node
// @ts-check
import { defineCommand, runMain } from 'citty';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));

const flavors = ['js', 'javascript', 'ts', 'typescript', 'react', 'next'];
const flavorMap = {
  'js': 'javascript',
  'javascript': 'javascript',
  'ts': 'typescript',
  'typescript': 'typescript',
  'react': 'react',
  'next': 'next'
};

const addDependency = (packageName, version, dev = false) => {
  const packageJsonPath = 'package.json';
  const packageJsonObj = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  const depKey = dev ? 'devDependencies' : 'dependencies';
  (packageJsonObj[depKey] ??= {})[packageName] = `^${version}`;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonObj, null, 2) + '\n');
};

const getTemplate = (flavor) => {
  const normalized = flavorMap[flavor];

  return `import { ${normalized}Config } from 'eslint-config-gev/${normalized}';

export default [
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
];
`;
};

const setupEslint = (flavor, { force }) => {
  const filename = 'eslint.config.js';

  if (fs.existsSync(filename) && !force) {
    throw new Error(
      `There is already an ${filename} in the directory! Use -f to overwrite.`
    );
  }

  fs.writeFileSync(filename, getTemplate(flavor));

  addDependency('eslint', '9', true);
  addDependency('eslint-config-gev', pkgJson.version, true);

  console.log('✅ eslint.config.js created!');
  console.log('✅ eslint-config-gev was added as a devDependency!');
  console.log('📦 Run "npm/yarn/pnpm/bun install" to install it!');
};

const main = defineCommand({
  meta: {
    name: pkgJson.name,
    version: pkgJson.version,
    description: pkgJson.description,
  },
  args: {
    force: {
      type: 'boolean',
      alias: 'f',
      description: "Overwrites the existing 'eslint.config.js'",
    },
    flavor: {
      type: 'positional',
      required: true,
      description: `Your project kind. One of these: ${flavors.join(', ')}`,
    },
  },
  run: ({ args: { flavor, force } }) => {
    if (!flavors.includes(flavor)) {
      throw new Error(`The flavor must be one of these: ${flavors.join(', ')}`);
    }

    setupEslint(flavor, { force });
  },
});

runMain(main);
```

---

## Rollout Plan

### Step-by-Step Implementation

1. **Setup Phase** (Day 1)
   - [ ] Create `eslint9-migration/` directory
   - [ ] Copy LICENSE and basic structure
   - [ ] Create new `package.json` with ESLint 9 dependencies
   - [ ] Create `tsconfig.json` for type checking
   - [ ] Setup `.vscode/settings.json` for IDE support
   - [ ] Run `bun install` in migration directory

2. **Core Development** (Days 2-3)
   - [ ] Implement `src/configs/base.js` with `defineConfig()`
   - [ ] Implement `src/configs/javascript.js` with type safety
   - [ ] Implement all rule files in `src/rules/`
   - [ ] Add `// @ts-check` to all config files
   - [ ] Run `bun typecheck` to validate types
   - [ ] Test JavaScript config with sample files

3. **TypeScript Support** (Days 4-5)
   - [ ] Implement `src/configs/typescript.js`
   - [ ] Implement `src/rules/typescript.js`
   - [ ] Implement `src/utils/ts-extensions.js`
   - [ ] Update script for generating TS extensions
   - [ ] Test TypeScript config thoroughly

4. **React Support** (Day 6)
   - [ ] Implement `src/configs/react.js`
   - [ ] Implement `src/rules/react.js`
   - [ ] Test React config with TSX files

5. **Next.js Support** (Day 7)
   - [ ] Implement `src/configs/next.js`
   - [ ] Integrate with Next.js ESLint config
   - [ ] Test with Next.js project structure

6. **CLI & Examples** (Day 8)
   - [ ] Update `bin.js` for flat config
   - [ ] Create all example configurations
   - [ ] Test CLI installation flow

7. **Testing & Documentation** (Days 9-10)
   - [ ] Write comprehensive tests
   - [ ] Run tests against all configs
   - [ ] Verify type checking passes: `bun typecheck`
   - [ ] Update README.md with flat config examples
   - [ ] Create migration guide for existing users
   - [ ] Document breaking changes
   - [ ] Document type safety features

8. **Validation** (Day 11)
   - [ ] Test in real-world projects
   - [ ] Verify all plugins work correctly
   - [ ] Check performance improvements
   - [ ] Ensure Biome integration works
   - [ ] Validate IntelliSense works in VSCode
   - [ ] Test type checking catches errors

9. **Polish** (Day 12)
   - [ ] Fix any discovered issues
   - [ ] Run full type check: `bun run check`
   - [ ] Update CI/CD for ESLint 9 and type checking
   - [ ] Prepare changelog
   - [ ] Tag as v5.0.0-beta

10. **Release** (Day 13+)
    - [ ] Publish beta version to npm
    - [ ] Gather feedback
    - [ ] Make final adjustments
    - [ ] Release v5.0.0

---

## Deprecated Plugins List

Create a `DEPRECATED_PLUGINS.md` file to track plugins that are no longer used:

```markdown
# Deprecated Plugins

These plugins are no longer used in eslint-config-gev v5+:

## Removed in ESLint 9 Migration

### @rushstack/eslint-patch
- **Reason**: Not needed with ESLint 9 flat config
- **Replacement**: Native ESM imports
- **Migration**: Remove from dependencies

### eslint-plugin-react-native
- **Reason**: React Native support dropped per project decision
- **Replacement**: None (feature removed)
- **Migration**: Use v4.x for React Native projects

### eslint-plugin-no-autofix
- **Reason**: Unclear ESLint 9 flat config support, limited maintenance
- **Replacement**: Native ESLint configuration or rule-specific disabling
- **Migration**: Review rules and disable autofix at configuration level

### eslint-plugin-require-extensions
- **Reason**: Outdated (3 years), better alternatives available
- **Replacement**: Use eslint-plugin-import's extension rules or TypeScript's module resolution
- **Migration**: Consider `import/extensions` rule or TypeScript configuration

## Notes for Future Migration

If you need any of these plugins in the future:
- Check their ESLint 9 compatibility status
- Look for maintained alternatives
- Consider contributing to update them for flat config
```

---

## Breaking Changes Document

Create `BREAKING_CHANGES.md`:

```markdown
# Breaking Changes in v5.0.0

## ESLint Version

- **Minimum ESLint version**: Now requires ESLint 9.x
- **Node.js version**: Minimum Node.js 18.0.0
- **Configuration format**: Must use flat config (`eslint.config.js`)

## Configuration Format

### Before (v4.x)
```javascript
// .eslintrc.cjs
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: ['eslint-config-gev/ts'],
  // ...
};
```

### After (v5.x)
```javascript
// eslint.config.js
import { typescriptConfig } from 'eslint-config-gev';

export default [
  ...typescriptConfig,
  // ...
];
```

## Removed Features

1. **React Native support** - No longer included
2. **@rushstack/eslint-patch** - No longer needed
3. **Legacy .eslintrc format** - Not supported

## Package Structure

- Now uses ESM (`"type": "module"`)
- New export paths:
  - `eslint-config-gev` → default (TypeScript)
  - `eslint-config-gev/javascript` → JavaScript config
  - `eslint-config-gev/typescript` → TypeScript config
  - `eslint-config-gev/react` → React config
  - `eslint-config-gev/next` → Next.js config

## Plugins Updated

- `@typescript-eslint/*`: v7 → v8 (breaking changes in rules)
- `eslint-plugin-unused-imports`: v3 → v4
- `eslint-plugin-jsdoc`: v48 → v50+

## Migration Path

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed migration instructions.
```

---

## Success Criteria

The migration is complete when:

1. ✅ All configs work with ESLint 9
2. ✅ All tests pass
3. ✅ Type checking passes (`bun typecheck` with no errors)
4. ✅ CLI tool generates working flat configs with `defineConfig()`
5. ✅ Documentation is updated
6. ✅ Example configurations work in real projects
7. ✅ Performance is equal or better than v4
8. ✅ No warnings in console during usage
9. ✅ Biome integration works seamlessly
10. ✅ TypeScript type checking works correctly
11. ✅ All plugins properly loaded and functional
12. ✅ IntelliSense provides autocomplete and documentation
13. ✅ Type errors are caught during development

---

## Additional Resources

### Useful Links

- [ESLint Flat Config Documentation](https://eslint.org/docs/latest/use/configure/configuration-files)
- [ESLint v9 Migration Guide](https://eslint.org/docs/latest/use/migrate-to-9.0.0)
- [@stylistic/eslint-plugin Docs](https://eslint.style/)
- [TypeScript ESLint v8 Docs](https://typescript-eslint.io/)
- [ESLint Plugin Compatibility Tracker](https://github.com/eslint/eslint/issues/18391)

### Key Differences: Legacy vs Flat Config

| Feature | Legacy (.eslintrc) | Flat Config (eslint.config.js) |
|---------|-------------------|--------------------------------|
| Format | JSON/YAML/JS Object | JS Array of Objects |
| Extends | String array | Spread arrays |
| Plugins | String array | Object with imports |
| Parser | String | Direct import |
| Env | Object | `languageOptions.globals` |
| Overrides | Nested array | Separate config objects |
| Cascading | Automatic | Explicit array order |

---

## Timeline Estimate

**Total estimated time**: 2-3 weeks

- Week 1: Core implementation (base, JS, TS configs)
- Week 2: React/Next.js, CLI, examples
- Week 3: Testing, documentation, beta release

**Conservative estimate**: 3-4 weeks including buffer for unexpected issues

---

## Questions to Resolve

1. Should we maintain v4 (ESLint 8) in a separate branch?
2. What's the deprecation timeline for v4?
3. Do we need a codemod tool for automatic migration?
4. Should we publish alpha/beta versions during development?
5. What's the minimum Node.js version? (Recommend 18+)

---

## Notes

- This migration prioritizes clean architecture over backward compatibility
- The new structure is more maintainable and follows ESLint 9 best practices
- Each config is composable and can be extended easily
- The removal of `@rushstack/eslint-patch` simplifies the dependency tree
- Using ESM throughout aligns with modern JavaScript practices
- Performance should improve due to ESLint 9's optimizations

---

## Type Safety Features Summary

### What's New in v5.0.0

**Type-Safe Configuration**
- ✅ All config files use `// @ts-check` for TypeScript validation
- ✅ `defineConfig()` from `eslint/config` for automatic type inference
- ✅ Full IntelliSense support in modern editors
- ✅ Type errors caught during development
- ✅ Autocomplete for rules, options, and settings

**Developer Experience**
- ✅ Hover documentation for all ESLint options
- ✅ Safe refactoring with TypeScript validation
- ✅ Typo detection (e.g., `rulez` vs `rules`)
- ✅ Invalid option detection at write-time
- ✅ Type checking script: `bun typecheck`

**Requirements**
- ESLint 9.22.0+ (for `defineConfig`)
- TypeScript in devDependencies (for type checking)
- VSCode or compatible editor (for IntelliSense)

### Migration Path for Users

When upgrading from v4 to v5, users can immediately benefit from type safety:

```javascript
// Old way (v4) - No type checking
module.exports = {
  extends: ['eslint-config-gev/ts'],
  rules: {
    'no-consol': 'error'  // ❌ Typo not caught
  }
};
```

```javascript
// New way (v5) - Type checked
// @ts-check
import { defineConfig } from 'eslint/config';
import { typescriptConfig } from 'eslint-config-gev';

export default defineConfig([
  ...typescriptConfig,
  {
    rules: {
      'no-consol': 'error'  // ✅ TypeScript error: Unknown rule
    }
  }
]);
```

---

**Last Updated**: 2025-11-23
**Author**: SrBrahma
**Version**: 2.0.0 (Updated with Type Safety)
```
