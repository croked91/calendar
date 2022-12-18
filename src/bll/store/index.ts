import { configureStore } from "@reduxjs/toolkit";
import tasks from "bll/slices/tasks";

export const store = configureStore({
  reducer: {
    tasks: tasks,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
