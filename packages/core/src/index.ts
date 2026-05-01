import { BadgeRenderer } from './badge-renderer';
import { HintModeController, defaultOnActivate } from './controller';
import type { HintModeHandle, HintModeOptions, HintModeState } from './types';

const defaultPinnedHint = (element: HTMLElement): string | undefined =>
  element.dataset.hint ?? undefined;

const defaultIsClickable = (): boolean | undefined => undefined;

const resolveOptions = (options: HintModeOptions = {}): Required<HintModeOptions> => ({
  root: options.root ?? document.body,
  activationKey: options.activationKey ?? 'f',
  hintChars: options.hintChars ?? 'sadfjklewcmpgh',
  onActivate: options.onActivate ?? defaultOnActivate,
  isClickable: options.isClickable ?? defaultIsClickable,
  pinnedHint: options.pinnedHint ?? defaultPinnedHint
});

/**
 * Create a hint-mode session. Installs a global keydown listener that
 * activates on the configured key and renders badges into a portal under
 * `document.body`. Call `dispose()` when you're done.
 */
export const createHintMode = (options: HintModeOptions = {}): HintModeHandle => {
  const resolved = resolveOptions(options);
  const controller = new HintModeController(resolved);
  const renderer = new BadgeRenderer();

  const unsubscribe = controller.subscribe((state) => renderer.apply(state));
  controller.start();

  return {
    activate: () => controller.activate(),
    cancel: () => controller.cancel(),
    subscribe: (listener) => controller.subscribe(listener),
    getState: () => controller.getState(),
    dispose: () => {
      unsubscribe();
      renderer.teardown();
      controller.dispose();
    }
  };
};

export type { HintModeHandle, HintModeOptions, HintModeState };
export { simulateClick, performTargetAction } from './click-simulator';
export { findClickableElements } from './clickable-elements';
export { assignHintLabels, DEFAULT_HINT_CHARS } from './hint-labels';
export { getStableElementKey } from './stable-element-key';
