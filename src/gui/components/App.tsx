import { useReducer } from 'react';
import './App.css';
import { SlidingTilesPuzzle } from '../../core/puzzle';
import { slide } from '../actions';
import reducer, {initState} from '../reducer';
import PuzzleGUI from './Puzzle';

function App() {

  const [state, dispatch] = useReducer(reducer, initState(4));
  
  const handleSlideRequest = (index: number) => {
    dispatch(slide(index));
  };

  return (
    <div className="App">
      <PuzzleGUI board={state.board} onSlide={handleSlideRequest} />
    </div>
  );
}

export default App;
