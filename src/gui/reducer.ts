import { SlidablePuzzle, Board, SlidingTilesPuzzle } from '../core/puzzle';
import { Actions, ACTION_INIT, ACTION_SLIDE } from './actions';

type InstanceId = number;

interface State {
  id: InstanceId;
  board: Board;
};

const instances = new Map<InstanceId, SlidablePuzzle>();
let nextInstanceId: InstanceId = 0;

export function initState(size: number): State {

  const id = nextInstanceId++;

  const puzzle = new SlidingTilesPuzzle(size);

  instances.set(id, puzzle);

  return {
    id,
    board: puzzle.board()
  };
};

export default function reducer(state: State, action: Actions) {

  if (action.type === ACTION_INIT) {
    return initState(action.size);
  }

  const puzzle = instances.get(state.id);

  if (!puzzle) {
    return state;
  }

  switch (action.type) {
    case ACTION_SLIDE: {
      puzzle.slide(action.index);
    }
  }

  return {
    ...state,
    board: puzzle.board()
  };
}
