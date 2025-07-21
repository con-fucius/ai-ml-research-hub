import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  site: 'https://con-fucius.github.io',
  base: '/ai-ml-research-hub',
  output: 'static',
  vite: {
    plugins: [yaml()],
  },
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },
  },
});
