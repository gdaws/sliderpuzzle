
export type Actions = InitAction | SlideAction;

export const ACTION_INIT = 'init';
export const ACTION_SLIDE = 'slide';

export interface InitAction {
  type: typeof ACTION_INIT,
  size: number;
};

export const init = (size: number): InitAction => ({type: ACTION_INIT, size});

export interface SlideAction {
  type: typeof ACTION_SLIDE;
  index: number;
};

export const slide = (index: number): SlideAction => ({type: ACTION_SLIDE, index});
