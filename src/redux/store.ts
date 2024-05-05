import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { jobSearchApi } from "../redux/api";

export const store = configureStore({
  reducer: {
    // rtk query fro api intrigation

    [jobSearchApi.reducerPath]: jobSearchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobSearchApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
