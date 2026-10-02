/** Formatos de data/hora dos mockups, iguais aos do macOS e do app (inglês, fuso local). */
function parts(date: Date, options: Intl.DateTimeFormatOptions): Record<string, string> {
  return Object.fromEntries(new Intl.DateTimeFormat('en-US', options).formatToParts(date).map((p) => [p.type, p.value]));
}

/** Relógio da barra de menus: "Fri Oct 2 9:41 AM". */
export function formatMenuBarClock(date: Date): string {
  const p = parts(date, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
  return `${p.weekday} ${p.month} ${p.day} ${p.hour}:${p.minute} ${p.dayPeriod}`;
}

/** Início de um problema na lista estendida: "10/02, 9:37 AM". */
export function formatStarted(date: Date): string {
  const p = parts(date, { month: '2-digit', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: true });
  return `${p.month}/${p.day}, ${p.hour}:${p.minute} ${p.dayPeriod}`;
}

export function startedAt(now: Date, ageSeconds: number): Date {
  return new Date(now.getTime() - ageSeconds * 1000);
}
