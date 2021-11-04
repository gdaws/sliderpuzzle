import { Board, initBoard, slide } from '../core/puzzle';

import { 
  Action, 
  ACTION_INIT, 
  ACTION_SLIDE, 
  ACTION_SHOW_NUMBERS, 
  ACTION_SHOW_REFERENCE_IMAGE 
} from './actions';

interface State {
  board: Board;
  numbersVisible: boolean;
  referenceImageVisible: boolean;
};

export function initState(size: number): State {

  const board = initBoard(size);

  return {
    board,
    numbersVisible: true,
    referenceImageVisible: false
  };
};

export default function reducer(state: State, action: Action) {

  switch (action.type) {
    case ACTION_INIT:
      return {...state, board: initBoard(action.size)};
    case ACTION_SHOW_NUMBERS: 
      return {...state, numbersVisible: action.visible};
    case ACTION_SHOW_REFERENCE_IMAGE:
      return {...state, referenceImageVisible: action.visible};
    case ACTION_SLIDE:
      slide(state.board, action.index);
      return {...state};
  }
}
