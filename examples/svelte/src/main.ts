import { mount } from 'svelte';
import App from './App.svelte';
import '@sannagroup/hint-mode/style.css';

const target = document.getElementById('app');
if (!target) throw new Error('#app not found');

mount(App, { target });
