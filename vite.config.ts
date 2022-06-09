import path from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, 'src/package/index.tsx'),
      name: 'json-view',
      formats: ['umd'],
      fileName: () => 'index.js',
    },
  },
});
