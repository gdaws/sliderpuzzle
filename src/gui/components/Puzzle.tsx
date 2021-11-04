import { ReactNode, Fragment } from 'react';
import { Board, EMPTY_SPACE } from '../../core/puzzle';
import styles from './Puzzle.module.css';

interface TileProps {
  position: number;
  value: number;
  size: number;
  onSlide?: (position: number) => void;
  tileNumbersVisible: boolean;
  cssBoardSize?: string;
};

function Tile(props: TileProps) {

  const v = props.value;
  const i = props.position;
  const size = props.size;

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
    backgroundSize: `${100 * size}% ${100 * size}%`,
    backgroundPosition: `${vx/size * (1/(1 - 1/size)) * 100}% ${vy/size * (1/(1 - 1/size)) *  100}%`
  };

  const handleClick = () => {
    if (props.onSlide) {
      props.onSlide(i);
    }
  };

  return (
    <div key={v} className={styles.tile} style={style} onMouseDown={handleClick}>
      {props.tileNumbersVisible ? <span className={styles.number}>{v}</span> : null}
    </div>
  );
}

interface Props {
  board: Board;
  onSlide: (index: number) => void;
  referenceVisible: boolean;
  tileNumbersVisible: boolean;
};

export default function Puzzle(props: Props) {

  const { size } = props.board;

  let referenceBoard: ReactNode | undefined;

  if (props.referenceVisible) {
    referenceBoard = (
      <div className={styles.refBoard}>
        {series(size * size).map(v => <Tile value={v} position={v - 1} size={size} tileNumbersVisible={false} cssBoardSize="--refboard-size" />)}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {referenceBoard}
      <div className={styles.board}>
        {sort(props.board).map((i, v) => <Tile value={v} position={i} size={size} onSlide={props.onSlide} tileNumbersVisible={props.tileNumbersVisible} />)}
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
