import { combineReducers, Reducer } from '@reduxjs/toolkit';

import { RESET_STATE_ACTION_TYPE } from './actions';
import {
  departmentApi,
  departmentApiReducer,
  fileApi,
  fileApiReducer,
  projectApi,
  projectApiReducer,
  resumeApi,
  resumeApiReducer,
  roleAPI,
  roleApiReducer,
  taskApi,
  taskApiReducer,
  userAPI,
  userAPIReducer,
} from './api';
import {
  i18nReducer,
  i18nSlice,
  projectReducer,
  projectSlice,
  settingsReducer,
  settingsSlice,
  userInitialState,
  userReducer,
  userSlice,
} from './slices';

const rootStore = {
  [i18nSlice.name]: i18nReducer,
  [settingsSlice.name]: settingsReducer,
  [userSlice.name]: userReducer,
  [userAPI.reducerPath]: userAPIReducer,
  [projectSlice.name]: projectReducer,
  [projectApi.reducerPath]: projectApiReducer,
  [taskApi.reducerPath]: taskApiReducer,
  [resumeApi.reducerPath]: resumeApiReducer,
  [departmentApi.reducerPath]: departmentApiReducer,
  [roleAPI.reducerPath]: roleApiReducer,
  [fileApi.reducerPath]: fileApiReducer,
};
const createReducer =
  (asyncStore?: Record<string, Reducer>): Reducer =>
  (state, action) => {
    let combinedState = state;

    if (action.type === RESET_STATE_ACTION_TYPE) {
      combinedState = {
        ...state,
        user: {
          ...userInitialState,
          waitAuthCheck: false,
          isAuthenticated: false,
        },
      };
    }

    const combinedReducer = combineReducers({
      ...rootStore,
      ...asyncStore,
    });

    return combinedReducer(combinedState, action);
  };

export default createReducer;
