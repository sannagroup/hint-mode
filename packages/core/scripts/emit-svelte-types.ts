import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// svelte-package's d.ts emission is unreliable with cross-directory imports.
// We write the small surface for `<HintMode />` by hand.

const dir = join(import.meta.dir, '..', 'dist', 'svelte');
mkdirSync(dir, { recursive: true });

const dts = `import type { Component } from 'svelte';
import type { HintModeHandle, HintModeOptions } from '../types';

type HintModeProps = HintModeOptions & {
  /** Forwards the underlying handle for advanced control. */
  onReady?: (handle: HintModeHandle) => void;
};

export declare const HintMode: Component<HintModeProps>;
`;

writeFileSync(join(dir, 'index.d.ts'), dts);
console.log('wrote', join(dir, 'index.d.ts'));
