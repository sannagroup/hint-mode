# @sannagroup/hint-mode

Vimium-style keyboard hint navigation. Press a key, see labels appear over every clickable element, type a label to click it. Pure JS / TypeScript, no framework dependencies.

## Install

```bash
bun add @sannagroup/hint-mode
# or: npm i @sannagroup/hint-mode
```

## Usage

```ts
import { createHintMode } from '@sannagroup/hint-mode';
import '@sannagroup/hint-mode/style.css';

const hints = createHintMode({
  // all optional:
  activationKey: 'f',
  hintChars: 'sadfjklewcmpgh',
  root: document.body,
  onActivate: (target) => target.click(),
  isClickable: (element) => undefined,
  pinnedHint: (element) => element.dataset.hint
});

// Tear down later:
hints.dispose();
```

Press the activation key, type the displayed label, and the matching element gets clicked (or focused if it's a text input). `Esc` cancels.

## Pinning hints

For muscle memory, pin specific elements to specific 1–3-letter labels:

```html
<a href="/organizations" data-hint="OR">Organizations</a> <button data-hint="OP">Org picker</button>
```

Now `OR` always opens organizations and `OP` always opens the picker, regardless of what other elements are on the page. The label space adapts so no auto-assigned label collides with a pinned one.

## Theming

The default style is a small orange pill. Override with CSS variables:

```css
.hint-mode-badge {
  --hint-mode-bg: tomato;
  --hint-mode-fg: white;
}
```

## API

### `createHintMode(options?): HintModeHandle`

| Option          | Type                           | Default            | Description                                    |
| --------------- | ------------------------------ | ------------------ | ---------------------------------------------- |
| `activationKey` | `string`                       | `'f'`              | Key that toggles hint mode on.                 |
| `root`          | `HTMLElement`                  | `document.body`    | Subtree to scan for clickables.                |
| `hintChars`     | `string`                       | `'sadfjklewcmpgh'` | Character set used in labels. Alphabetic only. |
| `onActivate`    | `(el) => void`                 | `simulateClick`    | Action when a label uniquely matches.          |
| `isClickable`   | `(el) => boolean \| undefined` | —                  | Override clickability.                         |
| `pinnedHint`    | `(el) => string \| undefined`  | reads `data-hint`  | Programmatic pin source.                       |

### `HintModeHandle`

| Method                | Description                                        |
| --------------------- | -------------------------------------------------- |
| `activate()`          | Force-activate without keyboard input.             |
| `cancel()`            | Cancel an active session.                          |
| `subscribe(listener)` | Observe state changes. Returns unsubscribe fn.     |
| `getState()`          | Current `{ status, hints, typedPrefix }` snapshot. |
| `dispose()`           | Tear down listeners + DOM. Idempotent.             |

## License

MIT. Detection + click-simulation logic ported from [Vimium](https://github.com/philc/vimium) (MIT). See repo `NOTICE`.
