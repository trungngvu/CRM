import { createAction } from '@reduxjs/toolkit';

export const RESET_STATE_ACTION_TYPE = 'reset-state';

export const resetStateAction = createAction(RESET_STATE_ACTION_TYPE, () => ({
  payload: null,
}));
