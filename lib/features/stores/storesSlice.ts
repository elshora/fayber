import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface StoresState {
  stores: Store[];
}
const initialState: StoresState = {
  stores: [],
};

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    updateStore: (state, action: PayloadAction<Store>) => {
      const index = state.stores.findIndex(
        (store) => store.id === action.payload.id
      );
      if (index !== -1) {
        state.stores[index] = action.payload;
      } else {
        state.stores.push(action.payload);
      }
    },
    removeStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter(
        (store) => store.id !== action.payload
      );
    },
    addAllSStores: (state, action: PayloadAction<Store[]>) => {
      state.stores = action.payload;
    },
  },
});

export const { updateStore, removeStore, addAllSStores } = storesSlice.actions;
export default storesSlice.reducer;
