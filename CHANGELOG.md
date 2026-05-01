# @sannagroup/link-hints

## 0.2.3

### Patch Changes

- fa2ec35: Internal: extract `isEditableElement` / `isTextEntryInput` / `isContentEditable` into `src/utils/editable.ts` and share between `link-hints.ts` and `click-simulator.ts`, removing the duplicated `TEXT_INPUT_TYPES_TO_IGNORE` constant. The `isContentEditable` helper now also accepts an explicit `contentEditable="true"` attribute, fixing a latent case where `HTMLElement.isContentEditable` was not reflected by the live getter. Adds util test coverage to 100% statements/lines (click-simulator and emitter were previously untested). No public API change.

## 0.2.2

### Patch Changes

- 4bf3a48: Fix Node ESM resolution by adding explicit `.js` extensions to relative imports in source. Previously the published `dist/index.js` emitted `import ... from './badge-renderer'` which Node ESM (used by Vite SSR, Next.js server, etc.) cannot resolve, producing `Cannot find module '.../dist/badge-renderer'` at import time.

## 0.2.1

### Patch Changes

- b83449a: Internal: reorganize `src/` — move stateless helpers under `utils/`, move CSS under `style/`, rename `controller.ts` to `link-hints.ts` and the internal class `LinkHintsController` to `LinkHints`. Flatten the repo layout: drop the bun-workspaces monorepo and publish `@sannagroup/link-hints` directly from the root. No public API change.

## 0.2.0

### Minor Changes

- 10ddee0: Initial release. Vimium-style keyboard link-hint navigation, framework-free. Press `f` to label every visible interactive element, type the label to click it. README has integration recipes for Svelte, React, Vue, Solid, and Web Components.
