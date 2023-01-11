import { configureStore, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

import { ENVIRONMENT } from '@types';

import { departmentApi, fileApi, projectApi, resumeApi, roleAPI, taskApi, userAPI } from './api';
import createReducer from './root-reducer';

const store = configureStore({
  reducer: createReducer(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      userAPI.middleware,
      projectApi.middleware,
      resumeApi.middleware,
      taskApi.middleware,
      departmentApi.middleware,
      roleAPI.middleware,
      fileApi.middleware,
    ]),
  devTools: process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT,
});

export const persistor = persistStore(store);

/**
 * Create async reducer to dynamic import reducer later
 */
const asyncStore: Record<string, Reducer> = {};

/**
 * Code splitting reducer
 */
export const injectReducer = (key: string, reducer: Reducer) => {
  if (asyncStore[key]) {
    return false;
  }

  asyncStore[key] = reducer;

  store.replaceReducer(createReducer(asyncStore));

  return store;
};

export type RootStateProps = ReturnType<typeof store.getState>;

export type AppDispatchProps = typeof store.dispatch;

export const useAppDispatch: () => AppDispatchProps = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootStateProps> = useSelector;

export * from './slices';

export * from './actions';

export * from './api';

export default store;
