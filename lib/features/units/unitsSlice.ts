import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface unitsState {
  units: Unit[];
}

const initialState: unitsState = {
  units: [],
};

const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    addUnit: (state, action: PayloadAction<Unit>) => {
      state.units.push({ ...action.payload });
    },
    updateUnit: (state, action: PayloadAction<Unit>) => {
      const index = state.units.findIndex(
        (Unit) => Unit.unit_id === action.payload.unit_id
      );
      if (index !== -1) {
        state.units[index] = action.payload;
      } else {
        state.units.push(action.payload);
      }
    },
    removeUnit: (state, action: PayloadAction<string>) => {
      state.units = state.units.filter(
        (unit) => unit.unit_id !== action.payload
      );
    },
    addAllUnits: (state, action: PayloadAction<Unit[]>) => {
      state.units = action.payload;
    },
  },
});

export const { addUnit, updateUnit, removeUnit, addAllUnits } =
  unitsSlice.actions;
export default unitsSlice.reducer;
