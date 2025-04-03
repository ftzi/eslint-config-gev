<div align='center'>

[![npm](https://img.shields.io/npm/v/eslint-config-gev)](https://www.npmjs.com/package/eslint-config-gev)
</div>

# eslint-config-gev

Curated ESLint configs that I've been improving over the years. All my projects use this.

Since v4, **this should be used together with Biome**. Internally it uses my other package, the [eslint-config-biome](https://github.com/SrBrahma/eslint-config-biome). If you want to stay without Biome, use v3 together with Prettier (I recommend [prettier-config-gev](https://github.com/SrBrahma/prettier-config-gev))

## 💿 Install:

Run `npx eslint-config-gev <flavor>`, being flavor one of the following: `ts, next, react, react-native, js`. This list and further options can be seen by running `npx eslint-config-gev --help`.

This command adds the required package to your package.json and sets up the `.eslintrc.cjs`.

### Manually

```bash
npm i -D eslint-config-gev
```

- Add the following to the top of your .eslintrc.js:

```js
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-patch/modern-module-resolution');
```

With it, you won't need to install `eslint` and all the plugins we use!

## Do one of the following

### Typescript

- Add `'eslint-config-gev'` _(or `'eslint-config-gev/ts'`)_ to the `extends: [...]` field in your eslintrc.

  <details><summary><b>.eslintrc.js example</b></summary>

  ```js
  // https://github.com/SrBrahma/eslint-config-gev
  // This is a workaround for https://github.com/eslint/eslint/issues/3458
  require('@rushstack/eslint-patch/modern-module-resolution');

  module.exports = {
    root: true,
    env: {
      es2021: true,
      node: true,
    },
    extends: ['eslint-config-gev/js'],
    overrides: [
      {
        files: ['*.ts'],
        extends: ['eslint-config-gev/ts'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          tsconfigRootDir: __dirname,
          project: ['./tsconfig.json'],
          ecmaVersion: 12,
          sourceType: 'module',
        },
      },
    ],
    ignorePatterns: ['/lib/**/*', '/dist/**/*'],
    rules: {},
  };
  ```

  </details>

### Javascript

- Add `'eslint-config-gev/js'` to the `extends: [...]` field in your eslintrc.

  <details><summary><b>.eslintrc.js example</b></summary>

  ```js
  // https://github.com/SrBrahma/eslint-config-gev
  // This is a workaround for https://github.com/eslint/eslint/issues/3458
  require('@rushstack/eslint-patch/modern-module-resolution');
  module.exports = {
    root: true,
    env: {
      es2021: true,
      node: true,
    },
    extends: ['eslint-config-gev/js'],
    ignorePatterns: [],
    rules: {},
  };
  ```

  </details>

### React

#### Typescript

- Add `'eslint-config-gev/react'` to the `extends: [...]` field in your eslintrc.

  <details><summary><b>.eslintrc.js example</b></summary>

  ```js
  // https://github.com/SrBrahma/eslint-config-gev
  // This is a workaround for https://github.com/eslint/eslint/issues/3458
  require('@rushstack/eslint-patch/modern-module-resolution');

  module.exports = {
    root: true,
    env: {
      es2021: true,
      node: true,
    },
    extends: ['eslint-config-gev/react-js'],
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        extends: ['eslint-config-gev/react'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          tsconfigRootDir: __dirname,
          project: ['./tsconfig.json'],
          ecmaVersion: 12,
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    ],
    ignorePatterns: ['/lib/**/*', '/dist/**/*'],
    rules: {},
  };
  ```

</details>

#### Javascript

- Add `'eslint-config-gev/react-js'` to the `extends: [...]` field in your eslintrc.

  <details><summary><b>.eslintrc.js example</b></summary>

  ```js
  // https://github.com/SrBrahma/eslint-config-gev
  // This is a workaround for https://github.com/eslint/eslint/issues/3458
  require('@rushstack/eslint-patch/modern-module-resolution');

  module.exports = {
    root: true,
    env: {
      es2021: true,
      node: true,
    },
    extends: ['eslint-config-gev/react-js'],
    ignorePatterns: ['/lib/**/*', '/dist/**/*'],
    rules: {},
  };
  ```

  </details>

### React Native

#### Typescript

- Add `'eslint-config-gev/react-native'` to the `extends: [...]` field in your eslintrc.

  <details><summary><b>.eslintrc.js example</b></summary>

  ```js
  // https://github.com/SrBrahma/eslint-config-gev
  // This is a workaround for https://github.com/eslint/eslint/issues/3458
  require('@rushstack/eslint-patch/modern-module-resolution');

  module.exports = {
    root: true,
    env: {
      es2021: true,
      node: true,
      'react-native/react-native': true, // *1
    },
    extends: ['eslint-config-gev/react-native-js'],
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        extends: ['eslint-config-gev/react-native'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          tsconfigRootDir: __dirname,
          project: ['./tsconfig.json'],
          ecmaVersion: 12,
          sourceType: 'module',
          ecmaFeatures: {
            // *1
            jsx: true,
          },
        },
      },
    ],
    rules: {},
  };

  // [*1]: https://github.com/Intellicode/eslint-plugin-react-native#configuration
  ```

  </details>

#### Javascript

- Add `'eslint-config-gev/react-native-js'` to the `extends: [...]` field in your eslintrc.

  <details><summary><b>.eslintrc.js example</b></summary>

  ```js
  // https://github.com/SrBrahma/eslint-config-gev
  // This is a workaround for https://github.com/eslint/eslint/issues/3458
  require('@rushstack/eslint-patch/modern-module-resolution');

  module.exports = {
    root: true,
    env: {
      es2021: true,
      node: true,
      'react-native/react-native': true, // *1
    },
    extends: ['eslint-config-gev/react-native-js'],
    rules: {},
  };

  // [*1]: https://github.com/Intellicode/eslint-plugin-react-native#configuration
  ```

  </details>

## 📰 [Changelog](./CHANGELOG.md)
