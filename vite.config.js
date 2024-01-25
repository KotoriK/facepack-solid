// vite.config.ts
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'node:path'
import pkg from './package.json'
import { visualizer } from 'rollup-plugin-visualizer';
import dts from 'vite-plugin-dts'
import devtools from 'solid-devtools/vite'

export default defineConfig({
  plugins: [dts({ rollupTypes: true }), devtools({ autoname: true }), solidPlugin(), process.env.ANALYZE && visualizer()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      // the proper extensions will be added
      fileName: 'index',
    },
    target: 'esnext',
    minify: false,
    reportCompressedSize: false,
    sourcemap: true,
    rollupOptions: {
      external: Object.keys(pkg.dependencies).map(moduleName => new RegExp('^' + moduleName))
    },

  }/* , define: {
    "process.env.NODE_ENV": '"production"'
  } */
});