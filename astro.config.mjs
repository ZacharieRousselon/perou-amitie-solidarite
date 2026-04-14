// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://zacharierousselon.github.io',
  base: '/perou-amitie-solidarite',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});