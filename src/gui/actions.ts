
import { Board } from '../core/puzzle';
import { UiState } from './reducer';

export type Action = InitAction | SlideAction | SetUiConfigAction | ResetStatsAction;

export const ACTION_INIT = 'init';
export const ACTION_SLIDE = 'slide';
export const ACTION_SET_UI_CONFIG = 'setUiConfig';
export const ACTION_RESET_STATS = 'updateStats';

export interface InitAction {
  type: typeof ACTION_INIT;
  board: Board;
};

export const init = (board: Board): InitAction => ({type: ACTION_INIT, board});

export interface SlideAction {
  type: typeof ACTION_SLIDE;
  index: number;
  discountMove: boolean;
};

export const slide = (index: number, discountMove: boolean = false): SlideAction => ({type: ACTION_SLIDE, index, discountMove});

export interface SetUiConfigAction {
  type: typeof ACTION_SET_UI_CONFIG;
  values: UiState;
};

export const setUiConfig = (values: UiState): SetUiConfigAction => ({type: ACTION_SET_UI_CONFIG, values});

export interface ResetStatsAction {
  type: typeof ACTION_RESET_STATS;
  reset: boolean;
  freeze: boolean;
};

export const resetStats = (freeze: boolean = false): ResetStatsAction => ({type: ACTION_RESET_STATS, reset: true, freeze});
export const unfreezeStats = (): ResetStatsAction => ({type: ACTION_RESET_STATS, reset: false, freeze: false});
