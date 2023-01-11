import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { SETTINGS_CONFIG } from '@configs';
import history from '@history';
import { UserSliceProps } from '@types';

import { userAPI } from '../api';

const { SIGN_OUT_REDIRECT_URL } = SETTINGS_CONFIG;

export const userInitialState: UserSliceProps = {
  waitAuthCheck: true,
  isAuthenticated: undefined,
  accessToken: null,
  data: undefined,
};

export const userSlice = createSlice({
  name: 'user',

  initialState: userInitialState,

  reducers: {
    signOut: () => {
      history.push(SIGN_OUT_REDIRECT_URL);

      return { ...userInitialState, waitAuthCheck: false, isAuthenticated: false };
    },

    noAccessToken: () => ({
      ...userInitialState,
      waitAuthCheck: false,
      isAuthenticated: false,
    }),
  },

  extraReducers: builder => {
    builder.addMatcher(userAPI.endpoints.signInWithEmailAndPassword.matchFulfilled, (state, action) => {
      state.waitAuthCheck = false;
      state.isAuthenticated = true;
      // state.accessToken = action.payload.data.accessToken;
      // state.data = action.payload.data.user;

      state.accessToken = action.payload.token;
      state.data = action.payload.user;
    });
    builder.addMatcher(userAPI.endpoints.signInWithEmailAndPassword.matchRejected, state => {
      state.waitAuthCheck = false;
      state.isAuthenticated = false;
    });

    builder.addMatcher(userAPI.endpoints.signInWithToken.matchFulfilled, (state, action) => {
      state.waitAuthCheck = false;
      state.isAuthenticated = true;
      // state.accessToken = action.payload.data.accessToken;
      // state.data = action.payload.data.user;

      state.accessToken = action.payload.token;
      state.data = action.payload.user;
    });
    builder.addMatcher(userAPI.endpoints.signInWithToken.matchRejected, state => {
      state.waitAuthCheck = false;
      state.isAuthenticated = false;
    });
  },
});

export const selectUser = ({ user }: { user: UserSliceProps }) => user;

export const selectUserData = ({ user }: { user: UserSliceProps }) => user?.data;

export const selectUserRoles = ({ user }: { user: UserSliceProps }) => user?.data?.roles.map(item => item.name);

export const userActions = userSlice.actions;

export const userReducer = persistReducer(
  {
    key: 'rtk:user',
    storage,
    whitelist: ['accessToken'],
  },
  userSlice.reducer
);
