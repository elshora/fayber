import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ordersState {
  orders: Order[];
  pindingOrders: Order[];
  inventoryOrders: InventoryOrder[];
  pendingInventoryOrders: InventoryOrder[];
}

const initialState: ordersState = {
  orders: [],
  pindingOrders: [],
  inventoryOrders: [],
  pendingInventoryOrders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    loadOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.pindingOrders = state.orders.filter(
        (order) => order.state === "PENDING"
      );
    },
    loadInventoryOrders: (state, action: PayloadAction<InventoryOrder[]>) => {
      state.inventoryOrders = action.payload;
      state.pendingInventoryOrders = state.inventoryOrders.filter(
        (order) => order.state === "PENDING"
      );
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.pindingOrders.push(action.payload);
    },
    addInventoryOrder: (state, action: PayloadAction<InventoryOrder>) => {
      state.pendingInventoryOrders.push(action.payload);
    },
    rejectOrder: (state, action: PayloadAction<string>) => {
      state.pindingOrders = state.pindingOrders.filter(
        (order) => order.id !== +action.payload
      );
    },
    rejectInventoryOrder: (state, action: PayloadAction<string>) => {
      state.pendingInventoryOrders = state.pendingInventoryOrders.filter(
        (order) => order.id !== +action.payload
      );
    },
  },
});

export const {
  loadOrders,
  addOrder,
  rejectOrder,
  loadInventoryOrders,
  addInventoryOrder,
  rejectInventoryOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
