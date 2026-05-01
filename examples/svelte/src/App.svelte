<script lang="ts">
  import { HintMode } from '@sannagroup/hint-mode-svelte';
</script>

<main>
  <h1>hint-mode · svelte example</h1>
  <p>Press <kbd>f</kbd> to activate.</p>
  <div class="grid">
    <button>Save</button>
    <button>Cancel</button>
    <a href="#nope">Open</a>
    <input placeholder="Search" />
    <button data-hint="OP">Pinned OP</button>
  </div>
</main>

<HintMode />

<style>
  main { font-family: system-ui, sans-serif; max-width: 720px; margin: 2rem auto; padding: 0 1rem; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
  button, input, a { padding: 0.5rem 0.75rem; border-radius: 0.375rem; border: 1px solid #d4d4d4; font: inherit; }
  button { background: #2563eb; color: white; border: none; cursor: pointer; }
  a { display: inline-block; background: #16a34a; color: white; text-decoration: none; }
</style>
