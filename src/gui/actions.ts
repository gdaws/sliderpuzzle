
export type Action = InitAction | SlideAction | ShowNumbersAction | ShowReferenceImageAction | ResetStatsAction;

export const ACTION_INIT = 'init';
export const ACTION_SLIDE = 'slide';
export const ACTION_SHOW_NUMBERS = 'showNumbers';
export const ACTION_SHOW_REFERENCE_IMAGE = 'showReferenceImage';
export const ACTION_RESET_STATS = 'updateStats';

export interface InitAction {
  type: typeof ACTION_INIT,
  size: number;
};

export const init = (size: number): InitAction => ({type: ACTION_INIT, size});

export interface SlideAction {
  type: typeof ACTION_SLIDE;
  index: number;
  discountMove: boolean;
};

export const slide = (index: number, discountMove: boolean = false): SlideAction => ({type: ACTION_SLIDE, index, discountMove});

export interface ShowNumbersAction {
  type: typeof ACTION_SHOW_NUMBERS;
  visible: boolean;
};

export const showNumbers = (visible: boolean): ShowNumbersAction => ({type: ACTION_SHOW_NUMBERS, visible});

export interface ShowReferenceImageAction {
  type: typeof ACTION_SHOW_REFERENCE_IMAGE;
  visible: boolean;
};

export const showReferenceImage = (visible: boolean): ShowReferenceImageAction => ({type: ACTION_SHOW_REFERENCE_IMAGE, visible});

export interface ResetStatsAction {
  type: typeof ACTION_RESET_STATS;
  reset: boolean;
  freeze: boolean;
};

export const resetStats = (freeze: boolean = false): ResetStatsAction => ({type: ACTION_RESET_STATS, reset: true, freeze});
export const unfreezeStats = (): ResetStatsAction => ({type: ACTION_RESET_STATS, reset: false, freeze: false});
