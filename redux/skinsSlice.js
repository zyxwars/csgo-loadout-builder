import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSkins = createAsyncThunk("skins/fetchSkins", async () => {
  const res = await axios
    .get("http://csgobackpack.net/api/GetItemsList/v2/?currency=eur")
    .catch((err) => {
      console.log(err);
    });

  return res.data["items_list"];
});

const initialState = {
  status: "pending",
  skins: [],
};

export const skinsSlice = createSlice({
  name: "skins",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSkins.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.skins = payload;
    },
    [fetchSkins.pending]: (state) => {
      state.status = "pending";
    },
  },
});

export const {} = skinsSlice.actions;

export default skinsSlice.reducer;
