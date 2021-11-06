import { Board, initBoard, slide } from '../core/puzzle';

import { 
  Action, 
  ACTION_INIT, 
  ACTION_SLIDE, 
  ACTION_SHOW_NUMBERS, 
  ACTION_SHOW_REFERENCE_IMAGE 
} from './actions';

interface UiState {
  numbersVisible: boolean;
  referenceImageVisible: boolean;
  boardImage: string;
};

interface State {
  board: Board;
  ui: UiState;
};

export function initState(size: number, boardImage: string): State {

  const board = initBoard(size);

  return {
    board,
    ui: {
      numbersVisible: true, 
      referenceImageVisible: false,
      boardImage
    }
  };
};

export default function reducer(state: State, action: Action) {

  switch (action.type) {
    case ACTION_INIT:
      return {...state, board: initBoard(action.size)};
    case ACTION_SHOW_NUMBERS: 
      return {...state, ui: {...state.ui, numbersVisible: action.visible}};
    case ACTION_SHOW_REFERENCE_IMAGE:
      return {...state, ui: {...state.ui, referenceImageVisible: action.visible}};
    case ACTION_SLIDE:
      slide(state.board, action.index);
      return {...state};
  }
}
