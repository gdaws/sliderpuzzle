import { useReducer } from 'react';
import { incrementalScramble } from '../../core/scamble';
import { sleep } from '../../utils/timer';
import { slide, showTileNumbers, showReferenceImage } from '../actions';
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

  const toggleTileNumberVisibility = () => {
    dispatch(showTileNumbers(!state.tileNumbersVisible));
  };

  const toggleReferenceImageVisibility = () => {
    dispatch(showReferenceImage(!state.referenceImageVisible));
  };

  return (
    <div className="App">
      <button type="button" onClick={scramble}>Scramble</button>
      <label><input type="checkbox" value={1} checked={state.tileNumbersVisible} onClick={toggleTileNumberVisibility} /> Show numbers</label>
      <label><input type="checkbox" value={1} checked={state.referenceImageVisible} onClick={toggleReferenceImageVisibility} /> Show Reference Image</label>
      <PuzzleGUI 
        board={state.board} 
        tileNumbersVisible={state.tileNumbersVisible}
        referenceVisible={state.referenceImageVisible}
        onSlide={handleSlideRequest} />
    </div>
  );
}

export default App;
