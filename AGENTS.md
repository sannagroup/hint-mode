# AGENTS.md

Guidance for AI coding agents (Claude, Cursor, Aider, Codex, etc.) working in this repo.

## What this repo is

`hint-mode` is a small open-source library that ports [Vimium](https://github.com/philc/vimium)'s clickable-element detection and link-hint UX into a JavaScript/TypeScript library you can embed in any web page. Press `f`, see labels appear over every clickable element, type a label to click it.

It is published as a **single npm package** at `@sannagroup/hint-mode`. The package exposes:

- The vanilla core at the package root: `import { createHintMode } from '@sannagroup/hint-mode'`
- An optional Svelte 5 adapter via subpath: `import { HintMode } from '@sannagroup/hint-mode/svelte'`
- A default theme: `import '@sannagroup/hint-mode/style.css'`

`svelte` is an **optional** peer dependency. Vanilla consumers don't pay for it; bundlers tree-shake the Svelte build out unless `/svelte` is imported.

## Repo layout

```
hint-mode/
├── packages/core/          → @sannagroup/hint-mode (the only published package)
│   ├── src/
│   │   ├── index.ts                     public exports for vanilla
│   │   ├── types.ts                     HintModeOptions, HintModeHandle, HintModeState
│   │   ├── controller.ts                state machine + emitter
│   │   ├── badge-renderer.ts            vanilla DOM rendering
│   │   ├── click-simulator.ts           Vimium's 7-event simulateClick + performTargetAction
│   │   ├── clickable-elements.ts        Vimium's getLocalHintsForElement, ported
│   │   ├── hint-labels.ts               label generation + assignment
│   │   ├── stable-element-key.ts        deterministic key for muscle-memory ordering
│   │   ├── emitter.ts                   tiny synchronous Emitter, no deps
│   │   ├── style.css                    default theme + CSS variables
│   │   └── svelte/                      Svelte 5 wrapper component
│   │       ├── HintMode.svelte
│   │       └── index.ts
│   ├── tests/                           vitest specs (JSDOM)
│   ├── scripts/emit-svelte-types.ts     post-build step (see "Build pipeline")
│   ├── tsconfig.json                    typecheck config (noEmit, includes tests)
│   ├── tsconfig.build.json              vanilla build config (excludes svelte/)
│   ├── svelte.config.js                 vitePreprocess for the .svelte file
│   ├── vitest.config.ts                 svelte plugin + browser conditions for jsdom
│   └── package.json
├── examples/
│   ├── vanilla/                         plain HTML + Vite, demonstrates the core
│   └── svelte/                          Svelte + Vite, demonstrates /svelte
├── .changeset/                          Changesets — every PR with code changes
│                                        should add one
├── .github/workflows/
│   ├── ci.yml                           lint + typecheck + test + build on PR
│   └── release.yml                      Changesets-driven publish on main
├── tsconfig.base.json                   shared strict TS config
├── README.md                            full user-facing docs
├── LICENSE                              MIT
├── NOTICE                               Vimium attribution — required by MIT
└── package.json                         monorepo root, bun workspaces
```

## Tooling

- **Runtime/build:** [Bun](https://bun.sh) is the package manager. `bun install` at the repo root.
- **Workspaces:** Bun workspaces. Only `packages/core` publishes; `examples/*` are private.
- **Type-check:** `tsc -p tsconfig.json` (no emit, covers `src/` and `tests/`, excludes `.svelte` files).
- **Test:** [Vitest](https://vitest.dev) with `jsdom`. The Svelte spec uses `@testing-library/svelte` and needs `resolve.conditions: ['browser']` to find the client build of Svelte.
- **Build:** `tsc -p tsconfig.build.json` for vanilla, `svelte-package -i src/svelte -o dist/svelte` for the Svelte component, then `scripts/emit-svelte-types.ts` writes the public d.ts (svelte-package doesn't emit cross-directory d.ts reliably), then `cp src/style.css dist/style.css`.
- **Lint:** Prettier only. ESLint is intentionally not configured — TS strict + Prettier covers what we need for a small lib.
- **Versioning:** [Changesets](https://github.com/changesets/changesets). Run `bun changeset` to record a versioned change. The release workflow opens (or updates) a "Version Packages" PR; merging that PR publishes.

## Common commands

```bash
bun install                        # install everything

# At the package level (cd packages/core OR via filter)
bun run --filter='./packages/*' test       # run all tests
bun run --filter='./packages/*' typecheck  # tsc strict
bun run --filter='./packages/*' build      # build dist/

bun run lint                       # prettier --check
bun run format                     # prettier --write
bun changeset                      # interactively record a version bump

# Examples
bun --cwd examples/vanilla dev     # vanilla example at localhost:5173
bun --cwd examples/svelte dev      # svelte example at localhost:5173
```

## Conventions agents must follow

These are non-negotiable. They keep the lib small, predictable, and faithful to Vimium where it matters.

### Coding style

- **Strict TypeScript.** `tsconfig.base.json` has `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`. Follow them; don't relax them.
- **Arrow function expressions, not declarations.** `export const foo = () => { ... }`.
- **Explicit return types on exported functions and test helpers.** Helps API surface stay obvious.
- **No abbreviations** (`organization` not `org`, `element` not `el`, `event` not `e`). Single-word callback parameters are still single words.
- **No comments that just restate the code.** Comment only the _why_ — a hidden constraint, a cross-library workaround, a Vimium-derived rule worth preserving. The codebase favors named identifiers over commentary.
- **Extract complex inline expressions** into named consts before testing in `if` / `while` / argument positions. Avoids the "what is this expression actually computing" problem.
- **Use `??` over `||`** for object-or-undefined fallbacks.
- **Use `undefined`, not `null`,** in option / public-API surfaces. Keeps the type story consistent.
- **No re-exports through barrel layers** — public surface lives in `src/index.ts` (and `src/svelte/index.ts`); internals import directly from their source files.
- **Format with Prettier on every commit.** CI runs `bun run lint`. There is no auto-fix in CI; run `bun run format` locally.

### Architectural rules

- **The vanilla core has zero framework dependencies.** Don't import anything that isn't in `dependencies` (or available globally — DOM, ES). The Svelte component lives under `src/svelte/` and is the only place Svelte is allowed.
- **Don't break the controller / renderer split.** The controller mutates state and emits via the `Emitter`. The renderer subscribes and updates DOM. The renderer never reads its own DOM. The controller is testable without DOM rendering. Adding a React or Vue adapter should mean a _new_ renderer/wrapper, not coupling logic into the controller.
- **The detection rules in `clickable-elements.ts` mirror Vimium's `getLocalHintsForElement`.** If you change them, document precisely what diverges and why. The README's "How is this different from running Vimium itself?" section must stay honest.
- **The click sequence in `click-simulator.ts` mirrors Vimium's `simulateClick`.** Same constraint.
- **No `localStorage` / `sessionStorage` / cookies.** Per-route stability is in-memory only. Browser storage adds a privacy / quota / SSR-hostility burden that isn't worth it for this feature.
- **No global side effects on import.** Importing the package must not register listeners. Listeners only attach when `createHintMode()` is called, and only detach in `dispose()`.
- **`dispose()` must be idempotent.** Tests cover this; new APIs should preserve it.

### Public API stability

- The shape of `createHintMode(options)` and `HintModeHandle` is the contract. Adding new optional fields is fine. Removing or renaming requires a major bump.
- The CSS class names (`.hint-mode-portal`, `.hint-mode-badge`, `.hint-mode-badge__typed`, `.hint-mode-badge__remaining`) and the documented CSS variables are part of the contract.
- `data-hint` and `data-hint-id` are part of the contract. Don't change their semantics without a major bump.

### Testing

- **Every behavior change ships with a test.** No "tests as a follow-up".
- **Tests use `createElement` + helpers, not `innerHTML`.** XSS-safety hygiene + reliability.
- **JSDOM is strict.** `MouseEvent` rejects `view: window` — don't add it. Tests stub `getBoundingClientRect()` and `document.elementFromPoint` because JSDOM doesn't lay out real geometry.
- **Each test cleans up.** `beforeEach` clears the document body and resets stubs.

### Changesets

- **Every PR that changes shipped code adds a `.changeset/*.md` file.** Run `bun changeset` interactively to generate one.
- Use `patch` for bug fixes / docs / internal refactors. Use `minor` for new options or capabilities. Use `major` only when contracts above are broken.
- Examples (`examples/*`) and CI config don't need changesets — they're private to the repo.

### Vimium attribution

- This repo's `NOTICE` file credits Vimium. **It must stay.**
- If you port additional logic from Vimium, add a comment at the top of the file or function naming the original symbol (e.g. `// Ported from vimium/lib/dom_utils.js#simulateClick`).

## Build pipeline gotcha

`svelte-package` doesn't reliably emit `.d.ts` files when a Svelte component or its index imports types from outside the input directory (`-i src/svelte`). We work around this with `scripts/emit-svelte-types.ts`, which writes a hand-rolled `dist/svelte/index.d.ts`. If you change the Svelte component's prop shape, update that script's `dts` template — it's a four-line file.

## What goes in `dist/` (and what consumers see)

```
dist/
├── *.js / *.d.ts          vanilla files compiled by tsc
├── style.css              copied from src/style.css
└── svelte/
    ├── HintMode.svelte    compiled by svelte-package
    ├── index.js           compiled by svelte-package
    └── index.d.ts         hand-rolled by scripts/emit-svelte-types.ts
```

`package.json` `exports` map points at these:

```json
{
  ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
  "./svelte": {
    "types": "./dist/svelte/index.d.ts",
    "svelte": "./dist/svelte/index.js",
    "import": "./dist/svelte/index.js"
  },
  "./style.css": "./dist/style.css"
}
```

## When in doubt

1. **Read the existing tests.** They document the contract better than any comment.
2. **Check Vimium's source.** [`content_scripts/link_hints.js`](https://github.com/philc/vimium/blob/master/content_scripts/link_hints.js) and [`lib/dom_utils.js`](https://github.com/philc/vimium/blob/master/lib/dom_utils.js) are the authoritative references for detection and click semantics.
3. **Ask before breaking the public API.** It's an OSS lib — consumers exist.

## Useful prompts when editing this repo

- "Add a `nodeFilter` option that lets consumers exclude entire DOM subtrees" → tell the agent which test file to extend, where in the controller the filter applies, and to add a Changeset.
- "Port [behavior X] from Vimium" → link to the Vimium source line and ask the agent to add a comment naming the Vimium symbol it ports.
- "Add a React adapter" → tell the agent to put it under `src/react/`, mirror the Svelte structure (subpath export, optional peer dep), and write the d.ts emit script equivalent if needed.
