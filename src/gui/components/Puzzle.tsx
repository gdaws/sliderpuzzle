import { ReactNode, Fragment } from 'react';
import { Board, EMPTY_SPACE } from '../../core/puzzle';
import { Tile } from './Tile';
import styles from './Puzzle.module.css';

interface PuzzleProps {
  board: Board;
  numbersVisible: boolean;
  onSlide: (index: number) => void;
};

export default function Puzzle(props: PuzzleProps) {

  const { size } = props.board;

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {sort(props.board).map((i, v) => <Tile value={v} position={i} size={size} onSlide={props.onSlide} numbersVisible={props.numbersVisible} />)}
      </div>
    </div>
  );
}

function sort(board: Board): number[] {

  const { size, values } = board;
  const sorted = new Array(size * size);

  for (let i = 0; i < values.length; i++) {
    sorted[values[i]] = i;
  }

  return sorted;
}

function series(size: number): number[] {
  const values = new Array(size);
  for (let i = 0; i < size; i++) {
    values[i] = i + 1;
  }
  return values;
}
