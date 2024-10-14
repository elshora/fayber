import { createSlice } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    open: false,
  },
  reducers: {
    openDialog: (state) => {
      console.log(state.open);

      state.open = true;
    },
    closeDialog: (state) => {
      
      state.open = false;
      console.log(state.open);
    },
    toggleDialog: (state) => {
      console.log(state.open);
  
      state.open = !state.open;
    },
  },
});

export const { openDialog, closeDialog, toggleDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
