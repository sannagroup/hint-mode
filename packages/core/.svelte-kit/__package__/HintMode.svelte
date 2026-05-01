<script lang="ts">
  import { onMount } from 'svelte';
  import { createHintMode } from '../index';
  import type { HintModeHandle, HintModeOptions } from '../types';

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
