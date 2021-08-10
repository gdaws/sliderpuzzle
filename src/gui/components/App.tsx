import { useReducer } from 'react';
import { incrementalScramble } from '../../core/scamble';
import { sleep } from '../../utils/timer';
import { slide } from '../actions';
import reducer, {initState} from '../reducer';
import './App.css';
import PuzzleGUI from './Puzzle';

function App() {

  const [state, dispatch] = useReducer(reducer, initState(4));
  
  const handleSlideRequest = (index: number) => {
    dispatch(slide(index));
  };

  const scramble = async () => {
    for await (const target of incrementalScramble(state.board)) {
      console.log(target);
      dispatch(slide(target));
      await sleep(180);
    }
  };

  return (
    <div className="App">
      <button type="button" onClick={scramble}>Scramble</button>
      <PuzzleGUI board={state.board} onSlide={handleSlideRequest} />
    </div>
  );
}

export default App;
