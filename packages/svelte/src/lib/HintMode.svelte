<script lang="ts">
  import { onMount } from 'svelte';
  import { createHintMode } from '@sannagroup/hint-mode';
  import type { HintModeHandle, HintModeOptions } from '@sannagroup/hint-mode';

  type Props = HintModeOptions & {
    /** Forwards the underlying handle for advanced control. */
    onReady?: (handle: HintModeHandle) => void;
  };

  const { onReady, ...options }: Props = $props();

  onMount(() => {
    const handle = createHintMode(options);
    onReady?.(handle);
    return () => handle.dispose();
  });
</script>
