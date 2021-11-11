import { UiState } from './reducer';

const STORAGE_KEY_UICONFIG = 'uiConfig';

export function storeUiConfig(values: UiState) {

  if (!window || !window.localStorage) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY_UICONFIG, JSON.stringify(values));
}

function isUiState(value: {[key: string]: any}): value is UiState {
  return typeof value.boardImage === 'string' && typeof value.numbersVisible === 'boolean' && typeof value.referenceImageVisible === 'boolean';
}

export function loadUiConfig(): UiState | undefined {

  if (!window || !window.localStorage) {
    return;
  }

  const serialised = window.localStorage.getItem(STORAGE_KEY_UICONFIG);

  if (!serialised) {
    return;
  }

  const values = JSON.parse(serialised);

  if (isUiState(values)) {
    return values;
  }
}
