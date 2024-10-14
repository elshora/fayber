import { createSlice, PayloadAction } from "@reduxjs/toolkit";interface covenantState {
  userCovenant: CovenantDetails | any;
  users: CovenantDetails[];
}

const initialState: covenantState = {
  userCovenant: {},
  users: [],
};

const covenantSlice = createSlice({
  name: "covenant",
  initialState,
  reducers: {
    getCovenant: (state, action: PayloadAction<number>) => {
      state.userCovenant.original_cash = action.payload;
    },
    addCovenant: (state, action: PayloadAction<number | any>) => {
      state.userCovenant.original_cash = action.payload;
    },
  },
});

export const { addCovenant } = covenantSlice.actions;
export default covenantSlice.reducer;
