import { createSlice } from '@reduxjs/toolkit';

import { PlanSliceProps } from '@types';

export const planInitialState: PlanSliceProps = {
  currentPlan: null,
};

export const planSlice = createSlice({
  name: 'plan',

  initialState: planInitialState,

  reducers: {
    setCurrentPlan: (state, action) => {
      state.currentPlan = action.payload.id;
    },

    resetCurrentPlan: () => ({ ...planInitialState }),
  },

  extraReducers: () => {},
});

export const selectCurrentPlan = ({ plan }: { plan: PlanSliceProps }) => plan.currentPlan;

export const planActions = planSlice.actions;

export const planReducer = planSlice.reducer;
