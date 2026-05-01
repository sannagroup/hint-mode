# hint-mode

Vimium-style keyboard hint navigation for any web page. Press a key, see labels appear over every clickable element, type a label to click it.

```text
┌──────────────────────────────────────────┐
│  ┌───┐                                   │
│  │ AS│ Save  ┌──┐ Cancel  ┌──┐ Open      │
│  └───┘       │HD│         │OV│           │
│              └──┘         └──┘           │
│  ┌──┐                                    │
│  │FI│ ☐ Search…                          │
│  └──┘                                    │
└──────────────────────────────────────────┘
        Press F to activate
```

> **Status:** experimental. APIs may change before 1.0. No SLA on issues.

## Packages

| Package                                           | Description                              |
| ------------------------------------------------- | ---------------------------------------- |
| [`@sannagroup/hint-mode`](packages/core)          | Pure-JS core. No framework dependencies. |
| [`@sannagroup/hint-mode-svelte`](packages/svelte) | Thin Svelte 5 adapter component.         |

## Quick start

### Vanilla

```bash
bun add @sannagroup/hint-mode
```

```ts
import { createHintMode } from '@sannagroup/hint-mode';
import '@sannagroup/hint-mode/style.css';

const hints = createHintMode();
// Press `f` anywhere on the page.
// Call `hints.dispose()` to tear down.
```

### Svelte

```bash
bun add @sannagroup/hint-mode-svelte
```

```svelte
<script lang="ts">
  import { HintMode } from '@sannagroup/hint-mode-svelte';
  import '@sannagroup/hint-mode/style.css';
</script>

<HintMode />
```

## Why

Power users build muscle memory. Adding Vimium-style hints into your app means accountants, admins, ops folk and anyone who lives in the keyboard can move several times faster — without you having to write a single keyboard shortcut handler. Every visible button, link and input gets one automatically.

Compared to running the Vimium Chrome extension, embedding `hint-mode` means:

- **Stable hints per route.** The same button keeps the same label across activations and within-session navigations, so muscle memory actually forms.
- **`data-hint` attribute pinning.** Pin specific elements to specific shortcuts (`data-hint="OP"` → org-picker is always `OP`).
- **Themed to your app.** Default styles + CSS variables, no clash with your design system.
- **Works without the extension installed.**

## Acknowledgements

Detection rules (`getLocalHintsForElement`) and the click-simulation event sequence (`simulateClick`) are ported from [Vimium](https://github.com/philc/vimium) (MIT). See `NOTICE`.

## License

[MIT](LICENSE).
