import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxReadySignal } from '@nx/vite/plugins/nx-ready-signal.plugin';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../../node_modules/.vite/packages/shop/feature-product-detail',
  plugins: [react(), nxReadySignal()],
  test: {
    name: '@org/feature-product-detail',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['./src/test-setup.ts', '../../../tools/test-delay/setup.mjs'],
    reporters: ['default'],
    // Spec files run one at a time so Nx owns concurrency and each CPU burn
    // gets its own core.
    fileParallelism: false,
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
      include: ['src/**/*.{ts,tsx}'],
    },
  },
}));
