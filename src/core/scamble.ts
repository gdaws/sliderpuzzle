import { Board } from './puzzle';
import { pickRandom } from '../utils/random';

export async function* incrementalScramble(board: Board) {

  const [size, values] = board;

  let empty = values.indexOf(0);

  if (-1 === empty) {
    return;
  }

  const iterations = 4 * (size * size);

  for (let n = 0; n <= iterations; n++) {

    const x = empty % size;
    const y = Math.floor(empty / size);

    const h = 0 === n % 2;

    const [nx, ny] = pickRandom((h ? [[x - 1, y], [x + 1, y]] : [[x, y - 1], [x, y + 1]]).filter(([x, y]) => x >= 0 && x < size && y >= 0 && y < size));

    empty = ny * size + nx;

    yield empty;
  }
}
