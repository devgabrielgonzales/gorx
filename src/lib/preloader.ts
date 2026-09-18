"use client";

/**
 * The gate the hero entrance waits on. The preloader owns the first seconds of
 * the page, so anything that animates behind it would burn its entrance on a
 * covered screen; subscribers hold their start until the overlay is gone.
 */
let released = false;
const waiting = new Set<() => void>();
let failsafe: ReturnType<typeof setTimeout> | undefined;

export function releasePreloader() {
  if (released) return;
  released = true;
  if (failsafe) clearTimeout(failsafe);
  const pending = [...waiting];
  waiting.clear();
  pending.forEach((run) => run());
}

/**
 * Runs `callback` once the preloader has left, or right away if it already
 * has. Returns an unsubscribe for components that unmount while waiting.
 */
export function whenPreloaderDone(callback: () => void): () => void {
  if (released) {
    callback();
    return () => {};
  }
  waiting.add(callback);
  // Nothing may stay hidden because the overlay failed to finish — a broken
  // preloader must not take the page down with it.
  failsafe ??= setTimeout(releasePreloader, 8000);
  return () => waiting.delete(callback);
}
