---
'@sannagroup/link-hints': minor
---

Add a centralized `constants` module. `DEFAULT_HINT_CHARS`, `DEFAULT_ACTIVATION_KEY`, and the badge CSS class names (`PORTAL_CLASS`, `BADGE_CLASS`, `TYPED_CLASS`, `REMAINING_CLASS`) are now exported from the package root, so consumers can reference them directly instead of hardcoding the strings.
