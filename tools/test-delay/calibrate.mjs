#!/usr/bin/env node
/**
 * Measures how many burnCpu() units this machine completes per second on a
 * single core. Run it on a CI runner and paste the result into
 * UNITS_PER_SECOND in burn.mjs:
 *
 *   node tools/test-delay/calibrate.mjs
 */
import { burnCpu, UNITS_PER_SECOND } from './burn.mjs';

const SAMPLE = 400_000_000;

burnCpu(50_000_000); // warm up the JIT before measuring

const start = process.hrtime.bigint();
burnCpu(SAMPLE);
const seconds = Number(process.hrtime.bigint() - start) / 1e9;

const perSecond = Math.round(SAMPLE / seconds);
console.log(`cores visible:        ${(await import('node:os')).cpus().length}`);
console.log(`sample:               ${SAMPLE.toLocaleString()} units`);
console.log(`elapsed:              ${seconds.toFixed(2)}s`);
console.log(`measured:             ${perSecond.toLocaleString()} units/sec`);
console.log(
  `currently configured: ${UNITS_PER_SECOND.toLocaleString()} units/sec`,
);
console.log(
  `5s of work here would actually take ${(
    (5 * UNITS_PER_SECOND) /
    perSecond
  ).toFixed(1)}s with the configured constant`,
);
console.log(
  `\n=> set UNITS_PER_SECOND = ${perSecond} in tools/test-delay/burn.mjs`,
);
