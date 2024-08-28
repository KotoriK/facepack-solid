// vite.config.ts
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'node:path'
import pkg from './package.json'
import { visualizer } from 'rollup-plugin-visualizer';
import dts from 'vite-plugin-dts'
import devtools from 'solid-devtools/vite'

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true, exclude: ['template'] }), devtools({ autoname: true }), solidPlugin(), process.env.ANALYZE && visualizer()],
  build: {
    lib: {
      entry: {
        renderer: path.resolve(__dirname, 'src/renderer/index.ts'),
        importer: path.resolve(__dirname, 'src/FacePacksImporter.ts'),
        SakurairoDeployer: path.resolve(__dirname, 'src/SakurairoDeployer.tsx'),
        index: path.resolve(__dirname, 'src/index.ts'),
      },
      formats: ['es'],
    },
    target: 'esnext',
    minify: false,
    reportCompressedSize: false,
    sourcemap: true,
    rollupOptions: {
      external: Object.keys(pkg.dependencies).map(moduleName => new RegExp('^' + moduleName))
    },

  }, publicDir: process.env.NODE_ENV === 'production' ? false : undefined,
  /* , define: {
    "process.env.NODE_ENV": '"production"'
  } */
});