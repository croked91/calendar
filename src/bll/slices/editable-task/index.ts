import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IEditableTask } from "./interface";

const initialState: IEditableTask = {
  id: "",
  isEdited: false,
};

export const editableTask = createSlice({
  name: "editableTask",
  initialState,
  reducers: {
    setEditableTask: (state, action: PayloadAction<string>) => {
      return { ...state, id: action.payload };
    },
    setIsEditable: (state, action: PayloadAction<boolean>) => {
      return { ...state, isEdited: action.payload };
    },
  },
});

export const { setEditableTask, setIsEditable } = editableTask.actions;

export default editableTask.reducer;
