import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import locationReducer, { persistLocation } from "./slice/locationSlice";
import workspaceReducer from "./slice/workspaceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationReducer,
    workspace: workspaceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistLocation),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
