import { createSlice } from '@reduxjs/toolkit';

import { SettingsSliceProps } from '@types';

export const settingsInitialState: SettingsSliceProps = {
  display: {
    expandNavbar: false,
  },
  layout: {
    navbar: true,
    toolbar: true,
  },
};

export const settingsSlice = createSlice({
  name: 'settings',

  initialState: settingsInitialState,

  reducers: {
    toggleNavbar: state => {
      state.display.expandNavbar = !state.display.expandNavbar;
    },

    setLayout: (state, action) => {
      state.layout = {
        navbar: action?.payload?.navbar,
        toolbar: action?.payload?.toolbar,
      };
    },

    resetSettings: () => ({ ...settingsInitialState }),
  },

  extraReducers: () => {},
});

export const selectDisplaySetting = ({ settings }: { settings: SettingsSliceProps }) => settings.display;

export const selectLayoutSetting = ({ settings }: { settings: SettingsSliceProps }) => settings.layout;

export const settingsActions = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
