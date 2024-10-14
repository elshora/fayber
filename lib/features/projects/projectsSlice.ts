import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface projectsState {
  projects: Project[];
  completedProjects: Project[];
}

const initialState: projectsState = {
  projects: [],
  completedProjects: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      } else {
        state.projects.push(action.payload);
      }
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    addAllProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    addCompletedProjects: (state, action: PayloadAction<Project[]>) => {
      state.completedProjects = action.payload;
    },
  },
});

export const {
  addProject,
  updateProject,
  removeProject,
  addAllProjects,
  addCompletedProjects,
} = projectsSlice.actions;
export default projectsSlice.reducer;
