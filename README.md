# lbundle

Small zero-configuration bundler build on top of Rollup.js and SWC for NPM libraries

## 🚀 Motivation

There is always this repeated pattern for creating a library while following best practices that you need to maintain across all of your libraries,
but then I thought maybe creating a library for bundling libraries is a good idea.

## 💾 install

### NPM registry

```bash
# npm
npm i -D lbundle

# yarn
yarn add -D lbundle

# pnpm
pnpm i -D lbundle

# bun
bun i -D lbundle
```

### JSR registry

```bash
# deno
deno add @mrii/lbundle

# jsr
npx jsr add @mrii/rocket-io
```

## 🔧 Usage

### `package.json`

This bundler heavily relay on your `package.json` best practices.

```json
{
  "source": "./src/index.ts", // your source code entry
  "main": "./dist/index.js", // cjs entry
  "module": "./dist/index.mjs", // esm entry

  "types": "./dist/index.d.ts", // declaration entry

  "bin:source": "./src/cli.ts", // your source code bin entry
  "bin": "./dist/cli.js", // bin entry

  "sideEffects": false, // enable tree shaking for your library code, also useful for users bundlers

  // for lbundle@1, it still doesn't read exports, but maybe for the future

  "exports": {
    ".": {
      "default": "./dist/index.js",
      "node": "./dist/index.js",
      "require": "./dist/index.js",
      "import": "./dist/index.mjs",
      "types": "./dist/index.d.ts"
    },
    "./index.css": "./dist/index.css",
    "./package.json": "./package.json"
  }
}
```

### CLI

Just call lbundle binary

```bash
lbundle
```

And That's it, it will generate the bundle for you at the target directory.

## ✨ Features

- 🤩 all in 1: supports bundling your library into bin and normal bundle (cjs & esm), and generate declarations files as well.
- 🚀 fast: it uses rust to compile source code into target env.
- 🍙 bun: can be used with `bunx --bun lbundle` to speed up the bundling even more.
- 🌲 tree shaking: it will preserve your file structure (for `main` and `module` entries) so bundlers can exclude unused code easily.
- 🎮 typescript: it supports bundling typescript code out of the box (make sure have `typescript` installed).
- 🎯 JSX: supports JSX transformation out of the box (make sure have `react` and `react-dom` installed).
- 💅 styles: it support all kind of style files:
  - `css`, `pcss`, `sss`: out of the box.
  - `scss`, `sass`: just install `sass`.
  - `less`: just install `less`.
  - `styl`, `stylus`: just install `stylus`.
- 🍇 CSS modules: all styles files support CSS modules by just appending `.module.` before the file extension.
- 🗺️ path alias: supports TS path alias transformation.
- 📤 auto externals: look for your `dependencies` and `peerDependencies` and exclude them from the bundle.
- 🪛 json: supports importing `json` files in your code.
- 📦 polyfills: supports adding polyfills to the bundle if you're using latest ES features (make sure to have `core-js` installed)

## 🛣️ Roadmap

- [ ] bundling into UMD and AMD formats.
- [ ] reading `exports` field and generate extra output according to it.
- [ ] `vue` jsx transformation.
- [ ] extending SWC and Rollup config.
- [ ] useful logs.
- [ ] schema validation and useful errors.
- [ ] bundle info.
- [ ] watch mode.
- [ ] more options.
  - [ ] single entry instead of preserved modules.
  - [ ] JSX transformation options.
  - ...
- [ ] tests.
- [ ] CI.
- [ ] changelog.
- [ ] contributors.

## 🧰 API

```ts
// esm
import { lbundle } from 'lbundle';

// cjs
const { lbundle } = require('lbundle');

// deno
import { lbundle } from '@mrii/lbundle';

await lbundle({
  /* options */
});
```

## 🔍 Options

| key   | cli          | default | description               | version |
| ----- | ------------ | :-----: | ------------------------- | ------- |
| `cwd` | `---cwd, -c` |  `"."`  | root dir path of your lib | `1.0.0` |
