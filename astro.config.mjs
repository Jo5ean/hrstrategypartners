import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hrstrategypartners.com.ar',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
