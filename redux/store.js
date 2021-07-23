import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import skinsReducer from "./skinsSlice";
import loadoutsReducer from "./loadoutsSlice";
import loadoutDetailReducer from "./loadoutDetailSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: {
    skins: skinsReducer,
    loadouts: loadoutsReducer,
    loadout: loadoutDetailReducer,
  },
});
