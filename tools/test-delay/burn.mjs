/**
 * Fixed-work CPU burn used to simulate compute in the benchmark.
 *
 * It does a fixed amount of WORK, not work for a fixed DURATION: a sleep or a
 * spin-until-deadline takes the same wall time on every machine and hides the
 * hardware differences this benchmark measures.
 *
 * The loop is a serial dependent integer chain with no allocation, so it is
 * bound by clock speed and multiply latency rather than by the allocator and
 * GC. Those have changed little across CPU generations, which keeps old and new
 * hardware close together and results stable.
 */

/**
 * Units that take roughly 1 second on one GitHub Actions vCPU. An estimate:
 * run `node tools/test-delay/calibrate.mjs` on a runner to measure it, or
 * override it with UNIT_TEST_UNITS_PER_SECOND.
 */
export const UNITS_PER_SECOND = 150_000_000;

/** Burn `units` of CPU. Returns the accumulator so it cannot be optimized away. */
export function burnCpu(units) {
  let a = 1;
  let b = 0x9e3779b9;
  for (let i = 0; i < units; i++) {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a ^ (a >>> 15);
    t = Math.imul(t, 1 | a) >>> 0;
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) >>> 0;
    b = (b ^ (t ^ (t >>> 14))) >>> 0;
  }
  return b;
}

/** Resolve a non-negative number from an env var, falling back to `fallback`. */
export function envNumber(name, fallback) {
  const raw = process.env[name];
  if (raw === undefined || raw === '') {
    return fallback;
  }
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export function sleep(ms) {
  return ms > 0
    ? new Promise((resolve) => setTimeout(resolve, ms))
    : Promise.resolve();
}
