// vite.config.ts
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'node:path'

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      // the proper extensions will be added
      fileName: 'FacePack',
    },
    target: 'esnext',
    minify: false,
    reportCompressedSize: false,
    sourcemap: true
  },
});