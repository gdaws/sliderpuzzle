
function * range(min: number, max: number) {
  for (let n = min; n <= max; n++) {
    yield n;
  }
}

export type Board = [size: number, values: number[]];

export const NO_EMPTY_SPACE = -1;
export const EMPTY_SPACE = 0;

export interface SlidablePuzzle {
  readonly size: number;
  isSolved(): boolean;
  at(index: number): number;
  board(): Board;
  slide(index: number): void;
};

export class SlidingTilesPuzzle implements SlidablePuzzle {

  public readonly size: number;
  private values: number[];

  public constructor(size: number) {
    this.size = size;
    this.values = Array.from(range(1, size * size - 1));
    this.values.push(0);
  }

  public isSolved(): boolean {

    const n = this.size * this.size;
    const v = this.values;

    for(let i = 0; i < n; i++) {
      if (v[i] !== i + 1) {
        return false;
      }
    }

    return true;
  }

  public at(index:number): number {
    return this.values[index];
  }

  public board(): Board {
    return [this.size, this.values];
  }

  public slide(index: number) {
    const empty = this.findEmptyNearby(index);
    if (empty === NO_EMPTY_SPACE) {
      return;
    }
    this.values[empty] = this.values[index];
    this.values[index] = 0;
  }

  private findEmptyNearby(index: number): number {

    const len = this.size;

    const x = index % len;

    const n = index - len;
    const e = index + 1;
    const s = index + len;
    const w = index - 1;

    const v = this.values;

    if (n >= 0 && EMPTY_SPACE === v[n]) {
      return n;
    }

    if (s < len * len && EMPTY_SPACE === v[s]) {
      return s;
    }

    if (e % len > x && EMPTY_SPACE === v[e]) {
      return e;
    }

    if (w % len < x && EMPTY_SPACE === v[w]) {
      return w;
    }

    return NO_EMPTY_SPACE;
  }
};
