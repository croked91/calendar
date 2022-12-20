import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../../../shared/lib/interfaces/ITask/interface";

const initialState: ITask[] = [];

const notifications = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotice: (state, action: PayloadAction<ITask>) => {
      console.log(action.payload);
      return [...state, action.payload];
    },
  },
});

export const { setNotice } = notifications.actions;

export default notifications.reducer;
