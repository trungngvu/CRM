import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import i18n from '@src/i18n';
import { I18nSliceProps, LANGUAGES } from '@types';

const i18nInitialState: I18nSliceProps = {
  language: i18n.options.lng as LANGUAGES,
  languages: [
    { id: LANGUAGES.VI, title: 'Vietnam' },
    { id: LANGUAGES.EN, title: 'English' },
  ],
};

export const i18nSlice = createSlice({
  name: 'i18n',

  initialState: i18nInitialState,

  reducers: {
    ['language-changed']: (state, action: PayloadAction<LANGUAGES>) => {
      state.language = action.payload;
    },
  },
});

export const changeLanguage = (languageId: LANGUAGES) => async (dispatch: Dispatch) => {
  await i18n.changeLanguage(languageId);

  dispatch(i18nSlice.actions['language-changed'](languageId));
};

export const i18nActions = i18nSlice.actions;

export const i18nReducer = i18nSlice.reducer;
