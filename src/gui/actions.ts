
export type Actions = InitAction | SlideAction | ShowTileNumbersAction | ShowReferenceImageAction;

export const ACTION_INIT = 'init';
export const ACTION_SLIDE = 'slide';
export const ACTION_SHOW_TILE_NUMBERS = 'showTileNumbers';
export const ACTION_SHOW_REFERENCE_IMAGE = 'showReferenceImage';

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

export interface ShowTileNumbersAction {
  type: typeof ACTION_SHOW_TILE_NUMBERS;
  visible: boolean;
};

export const showTileNumbers = (visible: boolean): ShowTileNumbersAction => ({type: ACTION_SHOW_TILE_NUMBERS, visible});

export interface ShowReferenceImageAction {
  type: typeof ACTION_SHOW_REFERENCE_IMAGE;
  visible: boolean;
};

export const showReferenceImage = (visible: boolean): ShowReferenceImageAction => ({type: ACTION_SHOW_REFERENCE_IMAGE, visible});

