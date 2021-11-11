import { Board, initBoard, cloneBoard, slide, solved } from '../core/puzzle';

import { 
  Action, 
  ACTION_INIT, 
  ACTION_SLIDE, 
  ACTION_SET_UI_CONFIG,
  ACTION_RESET_STATS
} from './actions';

export interface UiState {
  numbersVisible: boolean;
  referenceImageVisible: boolean;
  boardImage: string;
};

interface State {
  board: Board;
  frozenStats: boolean;
  moves: number;
  started: Date;
  finished: Date | undefined;
  ui: UiState;
};

export function initState(size: number, boardImage: string): State {

  const board = initBoard(size);

  return {
    board,
    frozenStats: false,
    moves: 0,
    started: new Date(),
    finished: new Date(),
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
      return {
        ...state, 
        board: action.board,
        moves: 0,
        started: new Date(),
        finished: solved(action.board) ? new Date() : void 0
      };
    case ACTION_SET_UI_CONFIG:
      return {...state, ui: action.values};
    case ACTION_SLIDE: {
      const solvedBefore = solved(state.board);
      const board = cloneBoard(state.board);
      const moved = slide(board, action.index);
      if (!moved) {
        return state;
      }
      const solvedAfter = solved(board);
      const moves = (!solvedBefore ? state.moves : -1) + (!action.discountMove && !state.frozenStats ? 1 : 0);
      const started = solvedBefore ? new Date() : state.started;
      const finished = solvedAfter ? new Date () : void 0;
      return {...state, board, moves, started, finished };
    }
    case ACTION_RESET_STATS: {
      const moves = action.reset ? 0 : state.moves;
      return {...state, moves, frozenStats: action.freeze };
    }
  }
}
