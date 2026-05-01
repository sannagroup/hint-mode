import { createHintMode } from '@sannagroup/link-hints';
import '@sannagroup/link-hints/style.css';

const hints = createHintMode();

// Example: log every activation.
hints.subscribe((state) => {
  if (state.status === 'active') {
    console.log(`[hint-mode] ${state.hints.size} hints rendered`);
  }
});
