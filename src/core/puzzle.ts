
export type Board = {
  size: number;
  values: number[]
};

export const NO_EMPTY_SPACE = -1;
export const EMPTY_SPACE = 0;

function * range(min: number, max: number) {
  for (let n = min; n <= max; n++) {
    yield n;
  }
}

export function initBoard(size: number): Board {

  if (size < 2) {
    throw new Error(`invalid board size ${size}: must be greater than 1`);
  }

  const board = {
    size,
    values: Array.from(range(1, size * size - 1))
  };

  board.values.push(EMPTY_SPACE);

  return board;
}

export function solved(board: Board): boolean {

  const n = board.size * board.size;
  const v = board.values;

  for(let i = 0; i < n; i++) {
    if (v[i] !== i + 1) {
      return false;
    }
  }

  return true;
}

export function slide(board: Board, index: number): Board {

  const empty = findEmpty(board, index);

  if (empty === NO_EMPTY_SPACE) {
    return board;
  }

  board.values[empty] = board.values[index];
  board.values[index] = 0;

  return board;
}

function findEmpty(board: Board, index: number): number {

  const len = board.size;

  const x = index % len;

  const n = index - len;
  const e = index + 1;
  const s = index + len;
  const w = index - 1;

  const v = board.values;

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
