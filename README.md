# hint-mode

Vimium-style keyboard hint navigation for any web page. Press a key, see labels appear over every clickable element, type a label to click it.

> **Status:** experimental. APIs may change before 1.0. No SLA on issues.

## Install

```bash
bun add @sannagroup/hint-mode
# or: npm i @sannagroup/hint-mode
```

A single package ships both the framework-free core and an opt-in Svelte adapter via subpath import. `svelte` is an **optional** peer dependency — vanilla consumers don't pay for it.

## Usage

### Vanilla / any framework

```ts
import { createHintMode } from '@sannagroup/hint-mode';
import '@sannagroup/hint-mode/style.css';

const hints = createHintMode();
// Press `f` anywhere on the page.
// hints.dispose() to tear down.
```

### Svelte

```svelte
<script lang="ts">
  import { HintMode } from '@sannagroup/hint-mode/svelte';
  import '@sannagroup/hint-mode/style.css';
</script>

<HintMode />
```

## Why

Power users build muscle memory. Adding Vimium-style hints into your app means accountants, admins, ops folk and anyone who lives in the keyboard can move several times faster — without you having to write a single keyboard shortcut handler. Every visible button, link, and input gets one automatically.

Compared to running the Vimium Chrome extension, embedding `hint-mode` means:

- **Stable hints per route.** The same button keeps the same label across activations and within-session navigations, so muscle memory actually forms.
- **`data-hint` attribute pinning.** Pin specific elements to specific shortcuts (`<a data-hint="OP">` → org-picker is always `OP`).
- **Themed to your app.** Default styles + CSS variables, no clash with your design system.
- **Works without the extension installed.**

## API

### `createHintMode(options?): HintModeHandle`

| Option          | Type                           | Default                     | Description                           |
| --------------- | ------------------------------ | --------------------------- | ------------------------------------- |
| `activationKey` | `string`                       | `'f'`                       | Key that toggles hint mode on.        |
| `root`          | `HTMLElement`                  | `document.body`             | Subtree to scan for clickables.       |
| `hintChars`     | `string`                       | `'sadfjklewcmpgh'`          | Character set used in labels.         |
| `onActivate`    | `(el) => void`                 | full mouse + click sequence | Action when a label uniquely matches. |
| `isClickable`   | `(el) => boolean \| undefined` | —                           | Override the default heuristic.       |
| `pinnedHint`    | `(el) => string \| undefined`  | reads `data-hint`           | Programmatic pin source.              |

### `HintModeHandle`

| Method                | Description                                        |
| --------------------- | -------------------------------------------------- |
| `activate()`          | Force-activate without keyboard input.             |
| `cancel()`            | Cancel an active session.                          |
| `subscribe(listener)` | Observe state changes. Returns unsubscribe fn.     |
| `getState()`          | Current `{ status, hints, typedPrefix }` snapshot. |
| `dispose()`           | Tear down listeners + DOM. Idempotent.             |

### Pinning hints (muscle memory)

```html
<a href="/organizations" data-hint="OR">Organizations</a> <button data-hint="OP">Org picker</button>
```

`OR` / `OP` are now reserved for those elements regardless of what else is on the page. Auto-assigned labels work around the reservations.

### Theming

```css
.hint-mode-badge {
  --hint-mode-bg: tomato;
  --hint-mode-fg: white;
}
```

## Repo layout

```
packages/
└── core/         → @sannagroup/hint-mode (also publishes /svelte)
examples/
├── vanilla/      bun --cwd examples/vanilla dev
└── svelte/       bun --cwd examples/svelte dev
```

## Acknowledgements

Detection rules (`getLocalHintsForElement`) and the click-simulation event sequence (`simulateClick`) are ported from [Vimium](https://github.com/philc/vimium) (MIT). See [`NOTICE`](NOTICE).

## License

[MIT](LICENSE).
