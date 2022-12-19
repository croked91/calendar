import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: string = "";

export const editableTask = createSlice({
  name: "editableTask",
  initialState,
  reducers: {
    setEditableTask: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setEditableTask } = editableTask.actions;

export default editableTask.reducer;
