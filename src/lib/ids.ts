let counter = 0;

/** Id único por build (ex.: máscaras SVG repetidas na mesma página). */
export function uid(prefix: string): string {
  counter += 1;
  return `${prefix}-${counter}`;
}
