import { Board } from '../../core/puzzle';
import { Tile } from './Tile';
import styles from './Puzzle.module.css';

interface PuzzleProps {
  board: Board;
  numbersVisible: boolean;
  backgroundImage: string;
  className?: string;
  onSlide: (index: number) => void;
};

export default function Puzzle(props: PuzzleProps) {

  const { size } = props.board;

  return (
    <div className={styles.container + (props.className ? ' ' + props.className : '')}>
      <div className={styles.board}>
        {sort(props.board).map((i, v) => <Tile 
          value={v} 
          position={i} 
          size={size} 
          numbersVisible={props.numbersVisible}
          backgroundImage={props.backgroundImage}
          onSlide={props.onSlide} />)}
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
