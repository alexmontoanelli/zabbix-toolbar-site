import { describe, expect, it } from 'vitest';
import { formatMenuBarClock, formatStarted, startedAt } from '../src/lib/clock';

describe('clock', () => {
  it('formats the menu bar clock like macOS (local time)', () => {
    expect(formatMenuBarClock(new Date(2026, 9, 2, 9, 41))).toBe('Fri Oct 2 9:41 AM');
    expect(formatMenuBarClock(new Date(2026, 9, 2, 21, 5))).toBe('Fri Oct 2 9:05 PM');
  });

  it('formats a problem start time like the app (MM/DD, h:mm AM)', () => {
    expect(formatStarted(new Date(2026, 9, 2, 9, 37))).toBe('10/02, 9:37 AM');
    expect(formatStarted(new Date(2026, 8, 30, 22, 40))).toBe('09/30, 10:40 PM');
  });

  it('computes the start from the problem age', () => {
    const now = new Date(2026, 9, 2, 9, 41);
    expect(startedAt(now, 240)).toEqual(new Date(2026, 9, 2, 9, 37));
  });
});
