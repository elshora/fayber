import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface StoresState {
  tasks: Task[];
}
const initialState: StoresState = {
  tasks: [],
};

const storesSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push({
        ...action.payload,
      });
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (store) => store.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      } else {
        state.tasks.push(action.payload);
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((store) => store.id !== action.payload);
    },
    addAllSTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, updateTask, removeTask, addAllSTasks } =
  storesSlice.actions;
export default storesSlice.reducer;
