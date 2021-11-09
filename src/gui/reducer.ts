import { Stats } from 'fs';
import { Board, initBoard, cloneBoard, slide } from '../core/puzzle';

import { 
  Action, 
  ACTION_INIT, 
  ACTION_SLIDE, 
  ACTION_SHOW_NUMBERS, 
  ACTION_SHOW_REFERENCE_IMAGE,
  ACTION_RESET_STATS
} from './actions';

interface UiState {
  numbersVisible: boolean;
  referenceImageVisible: boolean;
  boardImage: string;
};

interface State {
  board: Board;
  frozenStats: boolean;
  moves: number;
  ui: UiState;
};

export function initState(size: number, boardImage: string): State {

  const board = initBoard(size);

  return {
    board,
    frozenStats: false,
    moves: 0,
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
    case ACTION_SLIDE: {
      const board = cloneBoard(state.board);
      const moved = slide(board, action.index);
      const moves = state.moves + (moved && !action.discountMove && !state.frozenStats ? 1 : 0);
      return {...state, board, moves };
    }
    case ACTION_RESET_STATS: {
      const moves = action.reset ? 0 : state.moves;
      return {...state, moves, frozenStats: action.freeze };
    }
  }
}
