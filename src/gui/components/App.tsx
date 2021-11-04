import { useReducer } from 'react';
import { incrementalScramble } from '../../core/scramble';
import { sleep } from '../../utils/timer';
import { slide, showNumbers, showReferenceImage } from '../actions';
import reducer, {initState} from '../reducer';
import './App.css';
import Puzzle from './Puzzle';

function App() {

  const [state, dispatch] = useReducer(reducer, initState(4));
  
  const handleSlideRequest = (index: number) => {
    dispatch(slide(index));
  };

  const scramble = async () => {
    for await (const target of incrementalScramble(state.board)) {
      console.log(target);
      dispatch(slide(target));
      await sleep(18);
    }
  };

  const toggleTileNumbersVisibility = () => {
    dispatch(showNumbers(!state.numbersVisible));
  };

  const toggleReferenceImageVisibility = () => {
    dispatch(showReferenceImage(!state.referenceImageVisible));
  };

  return (
    <div className="App">
      <button type="button" onClick={scramble}>Scramble</button>
      <label><input type="checkbox" value={1} checked={state.numbersVisible} onClick={toggleTileNumbersVisibility} /> Show numbers</label>
      <label><input type="checkbox" value={1} checked={state.referenceImageVisible} onClick={toggleReferenceImageVisibility} /> Show Reference Image</label>
      <Puzzle
        board={state.board}
        numbersVisible={state.numbersVisible}
        onSlide={handleSlideRequest} />
    </div>
  );
}

export default App;
