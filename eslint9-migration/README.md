# eslint-config-gev

[![npm](https://img.shields.io/npm/v/eslint-config-gev)](https://www.npmjs.com/package/eslint-config-gev)

Curated ESLint 9 configs with flat config format for TypeScript, JavaScript, Next.js, and React projects.

## ✨ Features

- ✅ **ESLint 9** with flat config format
- ✅ **Type-safe** configurations using `defineConfig()`
- ✅ **TypeScript** full support with type checking
- ✅ **React** & **Next.js** specialized configs
- ✅ **Biome** integration for formatting
- ✅ **Auto-fix** for many rules
- ✅ **IntelliSense** with full autocomplete
- ✅ **Zero config** needed - works out of the box

## 🚀 Quick Start

### Automated Setup (Recommended)

Run the setup command for your project type:

```bash
npx eslint-config-gev@5 typescript
```

Available flavors: `js`, `javascript`, `ts`, `typescript`, `react`, `next`

This will:
- Create `eslint.config.js` with type-safe configuration
- Add `eslint-config-gev` to your `devDependencies`
- Configure ESLint 9 for your project

Then install dependencies:

```bash
npm install
# or
bun install
```

### Manual Setup

#### 1. Install

```bash
npm install -D eslint@^9 eslint-config-gev@^5
# or
bun add -d eslint@^9 eslint-config-gev@^5
```

#### 2. Create Config

Create `eslint.config.js` in your project root:

**TypeScript Project:**
```javascript
// @ts-check
import { defineConfig } from 'eslint/config';
import { typescriptConfig } from 'eslint-config-gev';

export default defineConfig([
  {
    ignores: ['**/dist/**', '**/build/**', '**/node_modules/**']
  },
  ...typescriptConfig,
]);
```

**React Project:**
```javascript
// @ts-check
import { defineConfig } from 'eslint/config';
import { reactConfig } from 'eslint-config-gev/react';

export default defineConfig([
  {
    ignores: ['**/dist/**', '**/build/**', '**/node_modules/**']
  },
  ...reactConfig,
]);
```

**Next.js Project:**
```javascript
// @ts-check
import { defineConfig } from 'eslint/config';
import { nextjsConfig } from 'eslint-config-gev/next';

export default defineConfig([
  {
    ignores: ['**/.next/**', '**/out/**', '**/node_modules/**']
  },
  ...nextjsConfig,
]);
```

**JavaScript Project:**
```javascript
// @ts-check
import { defineConfig } from 'eslint/config';
import { javascriptConfig } from 'eslint-config-gev/javascript';

export default defineConfig([
  {
    ignores: ['**/dist/**', '**/build/**', '**/node_modules/**']
  },
  ...javascriptConfig,
]);
```

## 📦 Exports

```javascript
import {
  baseConfig,        // Base ESLint rules
  javascriptConfig,  // JavaScript configuration
  typescriptConfig,  // TypeScript configuration (default export)
  reactConfig,       // React configuration
  nextjsConfig       // Next.js configuration
} from 'eslint-config-gev';
```

## 🎯 What's Included

### Base Rules
- ESLint recommended rules
- Biome compatibility (formatting rules disabled)
- Unused imports auto-removal
- Stylistic rules with @stylistic/eslint-plugin
- Import organization
- JSDoc validation

### TypeScript Rules
- TypeScript ESLint v8 strict type checking
- Type-aware linting
- Consistent type preferences
- Safe type assertions

### React Rules
- React recommended rules
- React Hooks linting with auto-fix
- JSX best practices
- React Refresh (for Vite)

### Next.js Rules
- Next.js core web vitals
- Image optimization checks
- Link component validation
- All React rules included

## 🔧 Type Safety

All configurations use ESLint 9's `defineConfig()` for full TypeScript support:

```javascript
// @ts-check enables type checking in JavaScript files
// @ts-check
import { defineConfig } from 'eslint/config';
import { typescriptConfig } from 'eslint-config-gev';

export default defineConfig([
  ...typescriptConfig,
  {
    rules: {
      // ✅ Full autocomplete and validation
      'no-console': 'warn'
    }
  }
]);
```

Benefits:
- ✅ Autocomplete for all rules and options
- ✅ Typo detection at write-time
- ✅ Hover documentation
- ✅ Type checking with `tsc --noEmit`

## 📝 Customization

### Override Rules

```javascript
export default defineConfig([
  ...typescriptConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': ['warn', { allow: ['error', 'warn'] }]
    }
  }
]);
```

### Add Globals

```javascript
export default defineConfig([
  ...javascriptConfig,
  {
    languageOptions: {
      globals: {
        myGlobal: 'readonly',
        process: 'readonly'
      }
    }
  }
]);
```

### Configure TypeScript

```javascript
export default defineConfig([
  ...typescriptConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.config.js'],
        },
        tsconfigRootDir: import.meta.dirname,
      }
    }
  }
]);
```

## 🔌 Plugins Included

- [@typescript-eslint](https://typescript-eslint.io/) - TypeScript linting
- [@stylistic/eslint-plugin](https://eslint.style/) - Code style rules
- [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import) - Import/export validation
- [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc) - JSDoc linting
- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) - React rules
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) - React Hooks rules
- [eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh) - React Refresh
- [eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports) - Remove unused imports
- [eslint-plugin-prefer-arrow-functions](https://github.com/JamieMason/eslint-plugin-prefer-arrow-functions) - Prefer arrow functions
- [eslint-plugin-no-relative-import-paths](https://github.com/MelvinVermeer/eslint-plugin-no-relative-import-paths) - Enforce absolute imports
- [eslint-config-biome](https://github.com/biomejs/biome) - Biome compatibility
- [eslint-config-next](https://nextjs.org/docs/app/building-your-application/configuring/eslint) - Next.js rules

## 🆚 Migration from v4.x

### Breaking Changes

1. **ESLint 9 Required**: Minimum ESLint version is now 9.0.0
2. **Flat Config Only**: Legacy `.eslintrc` format not supported
3. **Node 18+**: Minimum Node.js version is 18.0.0
4. **ESM**: Package is now ESM-only (`"type": "module"`)
5. **React Native**: Support removed (use v4.x for React Native)

### Migration Steps

1. **Update ESLint**:
   ```bash
   npm install -D eslint@^9 eslint-config-gev@^5
   ```

2. **Remove old config**:
   ```bash
   rm .eslintrc.js .eslintrc.json .eslintrc.yml
   ```

3. **Create new config**:
   ```bash
   npx eslint-config-gev@5 typescript
   ```

4. **Remove @rushstack/eslint-patch**:
   No longer needed! Remove from `package.json` and config files.

5. **Update scripts in `package.json`**:
   ```json
   {
     "scripts": {
       "lint": "eslint .",
       "lint:fix": "eslint . --fix"
     }
   }
   ```

## 📚 Resources

- [ESLint 9 Documentation](https://eslint.org/docs/latest/)
- [Flat Config Guide](https://eslint.org/docs/latest/use/configure/configuration-files)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Migration Guide](./MIGRATION_PLAN.md)

## 🤝 Used with Biome

This config is designed to work seamlessly with [Biome](https://biomejs.dev/) for formatting:

```bash
npm install -D @biomejs/biome
```

Create `biome.json`:
```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.0/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": false
  },
  "formatter": {
    "enabled": true
  }
}
```

## 📜 License

MIT © [SrBrahma](https://github.com/SrBrahma)

## 🐛 Issues

Found a bug or have a suggestion? [Open an issue](https://github.com/SrBrahma/eslint-config-gev/issues)

## ⭐ Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.
