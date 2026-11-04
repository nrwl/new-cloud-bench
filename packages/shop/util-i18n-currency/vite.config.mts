import { defineConfig } from 'vite';
import { nxReadySignal } from '@nx/vite/plugins/nx-ready-signal.plugin';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../../node_modules/.vite/packages/shop/util-i18n-currency',
  plugins: [nxReadySignal()],
  test: {
    name: '@org/shop-util-i18n-currency',
    watch: false,
    globals: true,
    environment: 'node',
    setupFiles: ['../../../tools/test-delay/setup.mjs'],
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
