import { Fragment } from 'react';
import { Board, EMPTY_SPACE } from '../../core/puzzle';
import styles from './Puzzle.module.css';

interface Props {
  board: Board;
  onSlide: (index: number) => void;
};

export default function Puzzle(props: Props) {

  const [size] = props.board;

  return (
    <div className={styles.board}>
      {sort(props.board).map((i, v) => {

        if (v === EMPTY_SPACE) {
          return (<Fragment key={v} />);
        }

        const x = i % size;
        const y = Math.floor(i / size);

        const vx = (v - 1) % size;
        const vy = Math.floor((v - 1) / size);

        const style = {
          left: (x / size * 100) + '%',
          top: (y / size * 100) + '%',
          width: (1/size * 100) + '%',
          height: (1/size * 100) + '%',
          backgroundPosition: `calc(${- 1 * (1/size) * vx} * var(--board-size)) calc(${-1 * (1/size) * vy} * var(--board-size))`
        };

        const handleClick = () => {
          props.onSlide(i);
        };

        return (
          <div key={v} className={styles.tile} style={style} onMouseDown={handleClick}>
            {v}
          </div>
        );
      })}
    </div>
  );
}

function sort(board: Board): number[] {

  const [size, values] = board;
  const sorted = new Array(size * size);

  for (let i = 0; i < values.length; i++) {
    sorted[values[i]] = i;
  }

  return sorted;
}
