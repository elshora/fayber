import { configureStore } from "@reduxjs/toolkit";import staffSlice from "./features/staff/staffSlice";
import unitsSlice from "./features/units/unitsSlice";
import categoriesSlice from "./features/categories/categoriesSlice";
import storesSlice from "./features/stores/storesSlice";
import projectsSlice from "./features/projects/projectsSlice";
import tasksSlice from "./features/tasks/tasksSlice";
import ordersSlice from "./features/orders/ordersSlice";
import covenantSlice from "./features/covenant/covenantSlice";
import dialogSlice from "./features/dialog/dialogSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      staff: staffSlice,
      units: unitsSlice,
      categories: categoriesSlice,
      stores: storesSlice,
      projects: projectsSlice,
      tasks: tasksSlice,
      orders: ordersSlice,
      covenant: covenantSlice,
      dialog: dialogSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
