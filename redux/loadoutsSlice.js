import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

import { loadoutModel } from "./loadoutDetailSlice";

export const fetchLoadouts = createAsyncThunk(
  "loadouts/fetchLoadouts",
  async () => {
    const loadouts = await AsyncStorage.getItem("loadouts");

    if (!loadouts) return initialState.loadouts;

    return JSON.parse(loadouts);
  }
);

const initialState = { loadouts: [], status: "pending" };

export const loadoutsSlice = createSlice({
  name: "loadouts",
  initialState,
  reducers: {
    createLoadout(state, { payload }) {
      const id = uuidv4();

      state.loadouts.push({
        id,
        name: payload.name.length > 1 ? payload.name : "Loadout",
        ...payload,
      });
      AsyncStorage.setItem("loadouts", JSON.stringify(state.loadouts));
      AsyncStorage.setItem(id, JSON.stringify(loadoutModel));
    },
    updateLoadout(state, { payload }) {
      state.loadouts = state.loadouts.map((loadout) =>
        loadout.id === payload.id ? payload : loadout
      );

      AsyncStorage.setItem("loadouts", JSON.stringify(state.loadouts));
    },
    deleteLoadout(state, { payload }) {
      //https://stackoverflow.com/questions/67436949/removing-a-value-from-an-array-using-redux-toolkit
      state.loadouts = state.loadouts.filter(
        (loadout) => loadout.id !== payload
      );
      AsyncStorage.setItem("loadouts", JSON.stringify(state.loadouts));
      AsyncStorage.removeItem(payload);
    },
  },
  extraReducers: {
    [fetchLoadouts.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.loadouts = payload;
    },
    [fetchLoadouts.pending]: (state) => {
      state.status = "pending";
    },
  },
});

export const { createLoadout, updateLoadout, deleteLoadout } =
  loadoutsSlice.actions;

export default loadoutsSlice.reducer;
