import { useReducer } from 'react';
import {shuffle } from '../../core/scramble';
import { initBoard } from '../../core/puzzle';
import { slide, init, showNumbers, showReferenceImage, resetStats } from '../actions';
import reducer, {initState} from '../reducer';
import texture2 from '../assets/texture2.jpg';
import Puzzle from './Puzzle';
import './App.css';

const initialState = initState(4, texture2);

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  
  const handleSlideRequest = (index: number) => {
    dispatch(slide(index));
  };

  const scramble = async () => {
    dispatch(init(shuffle(state.board)));
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
  
        <label><input type="checkbox" value={1} checked={state.ui.numbersVisible} onChange={toggleTileNumbersVisibility} /> Show numbers</label>
        <label><input type="checkbox" value={1} checked={state.ui.referenceImageVisible} onChange={toggleReferenceImageVisibility} /> Show Reference Image</label>

        <div>{state.moves} moves</div>
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
