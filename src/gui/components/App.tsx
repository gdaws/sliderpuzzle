import { useReducer, useState } from 'react';
import {shuffle } from '../../core/scramble';
import { initBoard } from '../../core/puzzle';
import { slide, init, setUiConfig } from '../actions';
import reducer, {initState, UiState} from '../reducer';
import { pictures } from '../assets';
import Stopwatch from './Stopwatch';
import AppSettingsDialog from './AppSettingsDialog';
import Puzzle from './Puzzle';
import './App.css';

const initialState = initState(4, pictures[0]);

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

  const handleSlideRequest = (index: number) => {
    dispatch(slide(index));
  };

  const scramble = async () => {
    dispatch(init(shuffle(state.board)));
  };

  const closeSettingsDialog = (config: UiState | undefined) => {
    
    setSettingsDialogOpen(false);

    if (config) {
      dispatch(setUiConfig(config));
    }
  };

  return (
    <div className="App">
      <div className="AppMenu">
        <button className="btn btn-default btn-settings" title="Settings" onClick={() => setSettingsDialogOpen(true)}>Settings</button>
        <button className="btn btn-primary" type="button" onClick={scramble}>Scramble</button>
        <div>{state.moves} moves</div>
        <div><Stopwatch start={state.started} stop={state.finished} /></div>
      </div>
      <div className="AppBody">
        {state.ui.referenceImageVisible ? <Puzzle className="AppRefBoard" board={initBoard(state.board.size)} numbersVisible={false} backgroundImage={state.ui.boardImage} onSlide={() => {}} /> : null}
        <Puzzle
          className={state.moves > 0 && state.finished ? "AppSolvedPuzzle" : ""}
          board={state.board}
          numbersVisible={state.ui.numbersVisible}
          backgroundImage={state.ui.boardImage}
          onSlide={handleSlideRequest} />
      </div>
      {settingsDialogOpen ? <AppSettingsDialog values={state.ui} onSubmit={closeSettingsDialog} /> : null}
    </div>
  );
}

export default App;
