import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "./interface";

const initialState: ITask[] = [];

export const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addNewTask: (state, action: PayloadAction<ITask>) => {
      return [...state, action.payload];
    },
    getOneTask: (state, action: PayloadAction<string>) => {
      return state.filter((task) => task.id === action.payload);
    },
    editTask: (state, action: PayloadAction<ITask>) => {
      return [
        ...state,
        {
          ...state.find((task) => task.id === action.payload.id),
          ...action.payload,
        },
      ];
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addNewTask, getOneTask, editTask, deleteTask } = tasks.actions;

export default tasks.reducer;
