import { createSlice } from '@reduxjs/toolkit';

import { ProjectSliceProps } from '@types';

export const projectInitialState: ProjectSliceProps = {
  currentProject: null,
};

export const projectSlice = createSlice({
  name: 'project',

  initialState: projectInitialState,

  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload.id;
    },

    resetCurrentProject: () => ({ ...projectInitialState }),
  },

  extraReducers: () => {},
});

export const selectCurrentProject = ({ project }: { project: ProjectSliceProps }) => project.currentProject;

export const projectActions = projectSlice.actions;

export const projectReducer = projectSlice.reducer;
