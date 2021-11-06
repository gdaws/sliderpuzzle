import { useReducer } from 'react';
import { incrementalScramble } from '../../core/scramble';
import { initBoard } from '../../core/puzzle';
import { sleep } from '../../utils/timer';
import { slide, showNumbers, showReferenceImage } from '../actions';
import reducer, {initState} from '../reducer';
import texture2 from '../assets/texture2.jpg';
import Puzzle from './Puzzle';
import './App.css';

function App() {

  const [state, dispatch] = useReducer(reducer, initState(4, texture2));
  
  const handleSlideRequest = (index: number) => {
    dispatch(slide(index));
  };

  const scramble = async () => {
    for await (const target of incrementalScramble(state.board)) {
      dispatch(slide(target));
      await sleep(18);
    }
  };

  const toggleTileNumbersVisibility = () => {
    dispatch(showNumbers(!state.ui.numbersVisible));
  };

  const toggleReferenceImageVisibility = () => {
    dispatch(showReferenceImage(!state.ui.referenceImageVisible));
  };

  return (
    <div className="App">
      <div className="AppMenu">
        <button className="btn" type="button" onClick={scramble}>Scramble</button>
        <label><input type="checkbox" value={1} checked={state.ui.numbersVisible} onClick={toggleTileNumbersVisibility} /> Show numbers</label>
        <label><input type="checkbox" value={1} checked={state.ui.referenceImageVisible} onClick={toggleReferenceImageVisibility} /> Show Reference Image</label>
      </div>
      <div className="AppBody">
        {state.ui.referenceImageVisible ? <Puzzle className="AppRefBoard" board={initBoard(state.board.size)} numbersVisible={false} backgroundImage={state.ui.boardImage} onSlide={() => {}} /> : null}
        <Puzzle
          board={state.board}
          numbersVisible={state.ui.numbersVisible}
          backgroundImage={state.ui.boardImage}
          onSlide={handleSlideRequest} />
      </div>
    </div>
  );
}

export default App;
