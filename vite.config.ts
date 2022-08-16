import path from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [solidPlugin(), cssInjectedByJsPlugin()],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'json-view',
      formats: ['es'],
      fileName: () => 'index.js',
    },
  },
});
