import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  eventTitleFilter: string;
}

const initialState: AppState = {
  eventTitleFilter: "",
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    saveEventTitleFilter: (state, action: PayloadAction<string>) => {
      state.eventTitleFilter = action.payload;
    },
  },
});

export const { saveEventTitleFilter } = appSlice.actions;

export default appSlice.reducer;
