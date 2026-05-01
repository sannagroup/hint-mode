# @sannagroup/hint-mode-svelte

Svelte 5 adapter for [`@sannagroup/hint-mode`](../core). A thin wrapper component that mounts the hint-mode session on `onMount` and tears it down on destroy.

## Install

```bash
bun add @sannagroup/hint-mode @sannagroup/hint-mode-svelte
```

## Usage

```svelte
<script lang="ts">
  import { HintMode } from '@sannagroup/hint-mode-svelte';
  import '@sannagroup/hint-mode/style.css';
</script>

<HintMode />
```

The component takes the same options as `createHintMode`:

```svelte
<HintMode
  activationKey="g"
  pinnedHint={(element) => element.dataset.shortcut}
  onActivate={(target) => target.click()}
/>
```

## Why a separate package?

The core has zero framework dependencies. Keeping the Svelte wrapper in its own package means:

- **Tree-shaking is honest.** Vanilla consumers don't pay the Svelte tax.
- **Peer dependencies are explicit.** Svelte is a peer dep here, never on the core.
- **Other framework adapters can sit alongside** without bloating any one package.

## License

MIT.
