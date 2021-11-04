import { ReactNode, Fragment } from 'react';
import { Board, EMPTY_SPACE } from '../../core/puzzle';
import styles from './Puzzle.module.css';

export interface TileProps {
  position: number;
  value: number;
  size: number;
  onSlide?: (position: number) => void;
  numbersVisible: boolean;
  cssBoardSize?: string;
};

export function Tile(props: TileProps) {

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
      {props.numbersVisible ? <span className={styles.number}>{v}</span> : null}
    </div>
  );
}
