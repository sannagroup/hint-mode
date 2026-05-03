/** Vimium's home-row-weighted character set. Alphabetic only so digit input never collides. */
export const DEFAULT_HINT_CHARS = 'sadfjklewcmpgh';

/** Default key that activates hint mode. Matches Vimium's `f`. */
export const DEFAULT_ACTIVATION_KEY = 'f';

/**
 * CSS class names used by the badge renderer. Part of the public CSS
 * contract — consumers can target these in their own stylesheets, or
 * reference the constants directly to avoid hardcoding the strings.
 */
export const PORTAL_CLASS = 'link-hints-portal';
export const BADGE_CLASS = 'link-hints-badge';
export const TYPED_CLASS = 'link-hints-badge__typed';
export const REMAINING_CLASS = 'link-hints-badge__remaining';
