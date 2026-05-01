# @sannagroup/hint-mode

Vimium-style keyboard hint navigation. Press a key, see labels appear over every clickable element, type a label to click it.

```bash
bun add @sannagroup/hint-mode
```

```ts
import { createHintMode } from '@sannagroup/hint-mode';
import '@sannagroup/hint-mode/style.css';

const hints = createHintMode();
```

For Svelte 5:

```svelte
<script lang="ts">
  import { HintMode } from '@sannagroup/hint-mode/svelte';
  import '@sannagroup/hint-mode/style.css';
</script>

<HintMode />
```

`svelte` is an optional peer dep — only required if you import the subpath.

See the [main README](../../README.md) for full API docs, theming, pinning, and acknowledgements.

## License

MIT.
