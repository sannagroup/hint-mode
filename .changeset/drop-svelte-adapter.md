---
"@sannagroup/hint-mode": minor
---

Drop the bundled Svelte adapter (`@sannagroup/hint-mode/svelte` subpath). The README's new "Framework integration" section shows copy-paste recipes for Svelte 5, React, Vue 3, Solid, and Web Components — each is 5–10 lines that wrap the framework-free core. Less code to maintain, no peer-dep complexity, and consumers can wire it into whatever stack they're on.

**Migrating from 0.1.x:** if you were importing `HintMode` from `@sannagroup/hint-mode/svelte`, copy the snippet from the README's "Svelte 5" section into your own component (12 lines).
