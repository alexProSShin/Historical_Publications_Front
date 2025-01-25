import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ModelsGetEventsDTO } from "../api/Api";
import { getEvents } from "../api/events.api";

export const getEventsThunk = createAsyncThunk<
  ModelsGetEventsDTO,
  string | undefined,
  { rejectValue: string }
>("app/getEvent", async (title) => {
  const response = await getEvents(title);
  return response;
});

export interface AppState {
  eventTitleFilter: string;
  publicationId: number;
  eventsCount: number;

  /* filters */
  pubStatusFilter: string;
  pubNameFilter: string;
  pubStartFormationFilter: string;
  pubEndFormationFilter: string;
}

const initialState: AppState = {
  eventTitleFilter: "",
  publicationId: 0,
  eventsCount: 0,

  pubStatusFilter: "",
  pubNameFilter: "",
  pubStartFormationFilter: "",
  pubEndFormationFilter: "",
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    saveEventTitleFilter: (state, action: PayloadAction<string>) => {
      state.eventTitleFilter = action.payload;
    },
    changePublicationData: (
      state,
      action: PayloadAction<{ eventsCount: number; publicationId: number }>
    ) => {
      state.publicationId = action.payload.publicationId;
      state.eventsCount = action.payload.eventsCount;
    },
    clearAppState: (state) => {
      state.eventsCount = 0;
      state.publicationId = 0;
      state.pubStatusFilter = "";
      state.pubNameFilter = "";
      state.pubEndFormationFilter = "";
      state.pubStartFormationFilter = "";
    },
    /* filters */
    savePubStatusFilter: (state, action: PayloadAction<string>) => {
      state.pubStatusFilter = action.payload;
    },
    savePubNameFilter: (state, action: PayloadAction<string>) => {
      state.pubNameFilter = action.payload;
    },
    savePubStartFormationFilter: (state, action: PayloadAction<string>) => {
      state.pubStartFormationFilter = action.payload;
    },
    savePubEndFormationFilter: (state, action: PayloadAction<string>) => {
      state.pubEndFormationFilter = action.payload;
    },
  },
});

export const {
  saveEventTitleFilter,
  changePublicationData,
  clearAppState,
  savePubStatusFilter,
  savePubNameFilter,
  savePubStartFormationFilter,
  savePubEndFormationFilter,
} = appSlice.actions;

export default appSlice.reducer;
