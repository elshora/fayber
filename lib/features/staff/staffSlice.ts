import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  staff: StaffMember[];
}

const initialState: UserState = {
  staff: [],
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    addAllStaff: (state, action: PayloadAction<StaffMember[]>) => {
      state.staff = action.payload;
    },
    updateUser: (state, action: PayloadAction<StaffMember>) => {
      const index = state.staff.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.staff[index] = action.payload;
      } else {
        state.staff.push(action.payload);
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.staff = state.staff.filter((user) => user.id !== action.payload);
    },
  },
});

export const { updateUser, removeUser, addAllStaff } = staffSlice.actions;
export default staffSlice.reducer;
