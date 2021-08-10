
export function pickRandom<T>(values: T[]): T {
  const index = Math.floor(Math.random() * values.length);
  return values[index];
}
