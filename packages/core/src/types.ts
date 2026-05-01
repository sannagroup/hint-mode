/** Reactive snapshot of hint mode state. */
export interface HintModeState {
  status: 'idle' | 'active';
  hints: ReadonlyMap<HTMLElement, string>;
  typedPrefix: string;
}

export interface HintModeOptions {
  /** Subtree to scan for clickables. Default: `document.body`. */
  root?: HTMLElement;

  /** Key that activates hint mode while idle. Default: `'f'`. */
  activationKey?: string;

  /** Character set for generated labels. Alphabetic only. Default: Vimium's home-row weighted set. */
  hintChars?: string;

  /**
   * Called when the user types a label that uniquely matches a hint.
   * Default: dispatches the seven-event mouse + click sequence used by Vimium.
   */
  onActivate?: (target: HTMLElement) => void;

  /**
   * Custom clickability check. Return `true` / `false` to override the
   * default Vimium-derived heuristic, or `undefined` to defer to it.
   */
  isClickable?: (element: HTMLElement) => boolean | undefined;

  /**
   * Source of pinned hint labels. Return a 1-3 letter label for an
   * element to pin it, or `undefined` to leave it auto-assigned.
   *
   * The default reads `element.dataset.hint`, so `<a data-hint="OR">`
   * is pinned to the literal label `OR`.
   */
  pinnedHint?: (element: HTMLElement) => string | undefined;
}

export interface HintModeHandle {
  /** Force-activate hint mode without keyboard input. No-op if already active. */
  activate(): void;
  /** Cancel an active session. No-op if already idle. */
  cancel(): void;
  /** Observe state changes. Returns an unsubscribe function. */
  subscribe(listener: (state: HintModeState) => void): () => void;
  /** Current snapshot. */
  getState(): HintModeState;
  /** Tear down listeners + rendered DOM. Idempotent. */
  dispose(): void;
}
