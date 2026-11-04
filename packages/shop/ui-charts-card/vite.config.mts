import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxReadySignal } from '@nx/vite/plugins/nx-ready-signal.plugin';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../../node_modules/.vite/packages/shop/ui-charts-card',
  plugins: [react(), nxReadySignal()],
  test: {
    name: '@org/shop-ui-charts-card',
    watch: false,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts', '../../../tools/test-delay/setup.mjs'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
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
