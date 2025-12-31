/**
 * Debounce Utility
 * Delays execution of a function until after a specified wait time
 * has elapsed since the last time it was invoked.
 */

/**
 * Creates a debounced version of a function that delays its execution
 * until after `wait` milliseconds have elapsed since the last call.
 *
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay (default: 150ms)
 * @returns A debounced version of the function with a cancel method
 *
 * @example
 * const debouncedResize = debounce(() => {
 *   console.log('Window resized');
 * }, 200);
 *
 * window.addEventListener('resize', debouncedResize);
 *
 * // To cleanup:
 * window.removeEventListener('resize', debouncedResize);
 * debouncedResize.cancel();
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number = 150
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (this: unknown, ...args: Parameters<T>): void {
    // Clear existing timeout
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // Set new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, wait);
  } as T & { cancel: () => void };

  // Add cancel method for cleanup
  debounced.cancel = (): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}

/**
 * Creates a throttled version of a function that only executes
 * at most once per `wait` milliseconds.
 *
 * Unlike debounce, throttle guarantees the function runs at regular intervals
 * during continuous events, making it better for scroll handlers.
 *
 * @param func - The function to throttle
 * @param wait - The minimum time between function calls (default: 100ms)
 * @returns A throttled version of the function with a cancel method
 *
 * @example
 * const throttledScroll = throttle(() => {
 *   console.log('Scroll position:', window.scrollY);
 * }, 100);
 *
 * window.addEventListener('scroll', throttledScroll);
 *
 * // To cleanup:
 * window.removeEventListener('scroll', throttledScroll);
 * throttledScroll.cancel();
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number = 100
): T & { cancel: () => void } {
  let lastTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const throttled = function (this: unknown, ...args: Parameters<T>): void {
    const now = Date.now();
    const remaining = wait - (now - lastTime);

    if (remaining <= 0 || remaining > wait) {
      // Clear any pending timeout
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      lastTime = now;
      func.apply(this, args);
    } else if (timeoutId === null) {
      // Schedule a trailing call
      timeoutId = setTimeout(() => {
        lastTime = Date.now();
        timeoutId = null;
        func.apply(this, args);
      }, remaining);
    }
  } as T & { cancel: () => void };

  // Add cancel method for cleanup
  throttled.cancel = (): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastTime = 0;
  };

  return throttled;
}
