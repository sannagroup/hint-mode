import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import HintMode from '../src/lib/HintMode.svelte';

describe('<HintMode />', () => {
  beforeEach(() => {
    document.body.replaceChildren();
    document.elementFromPoint = (): Element | null => document.body;
  });

  afterEach(() => {
    document.body.replaceChildren();
  });

  it('mounts without throwing and tears down on unmount', () => {
    const button = document.createElement('button');
    button.textContent = 'Hello';
    document.body.appendChild(button);

    const result = render(HintMode);
    expect(result).toBeTruthy();

    result.unmount();
    expect(document.querySelector('.hint-mode-portal')).toBeNull();
  });

  it('exposes the underlying handle via onReady', async () => {
    let captured: unknown;
    render(HintMode, {
      props: { onReady: (handle: unknown) => (captured = handle) }
    });

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(captured).toBeTypeOf('object');
  });
});
