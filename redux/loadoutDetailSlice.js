import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadoutModel = [
  {
    name: "Pistol",
    weapons: [
      { name: "Glock-18", skin: null },
      { name: "USP-S", skin: null },
      { name: "P2000", skin: null },
      { name: "Dual Berettas", skin: null },
      { name: "P250", skin: null },
      { name: "Five-SeveN", skin: null },
      { name: "Tec-9", skin: null },
      { name: "CZ75-Auto", skin: null },
      { name: "Desert Eagle", skin: null },
      { name: "R8 Revolver", skin: null },
    ],
  },
  {
    name: "SMG",
    weapons: [
      { name: "MAC-10", skin: null },
      { name: "MP9", skin: null },
      { name: "MP7", skin: null },
      { name: "MP5-SD", skin: null },
      { name: "UMP-45", skin: null },
      { name: "P90", skin: null },
      { name: "PP-Bizon", skin: null },
    ],
  },

  {
    name: "Rifle",
    weapons: [
      { name: "Galil AR", skin: null },
      { name: "FAMAS", skin: null },
      { name: "SSG 08", skin: null },
      { name: "AK-47", skin: null },
      { name: "M4A4", skin: null },
      { name: "M4A1-S", skin: null },
      { name: "SG 553", skin: null },
      { name: "AUG", skin: null },
      { name: "AWP", skin: null },
      { name: "G3SG1", skin: null },
      { name: "SCAR-20", skin: null },
    ],
  },
  {
    name: "Heavy",
    weapons: [
      { name: "Nova", skin: null },
      { name: "XM1014", skin: null },
      { name: "Sawed-Off", skin: null },
      { name: "MAG-7", skin: null },
      { name: "M249", skin: null },
      { name: "Negev", skin: null },
    ],
  },
  {
    name: "Melee",
    weapons: [
      { name: "Terrorist knife", skin: null },
      { name: "Counter-terrorist knife", skin: null },
    ],
  },
  {
    name: "Gloves",
    weapons: [
      { name: "Terrorist gloves", skin: null },
      { name: "Counter-terrorist gloves", skin: null },
    ],
  },
  {
    name: "Agent",
    weapons: [
      { name: "Terrorist agent", skin: null },
      { name: "Counter-terrorist agent", skin: null },
    ],
  },
];

const initialState = {
  status: "fulfilled",
  id: null,
  price: 0,
  skinDetail: null,
  types: loadoutModel,
};

export const fetchLoadout = createAsyncThunk(
  "loadout/fetchLoadout",
  async (idLoadout) => {
    const loadout = await AsyncStorage.getItem(idLoadout);

    if (!loadout) return { id: idLoadout, tyeps: loadoutModel };

    return { id: idLoadout, types: JSON.parse(loadout) };
  }
);

export const loadoutDetailSlice = createSlice({
  name: "loadoutDetail",
  initialState,
  reducers: {
    addSkin(state, { payload }) {
      const skin = { ...payload };

      if (skin.weapon_type === "Shotgun" || skin.weapon_type === "Machinegun") {
        skin.weapon_type = "Heavy";
      } else if (
        skin.weapon_type === "Sniper Rifle" ||
        skin.weapon_type === "AWP"
      ) {
        skin.weapon_type = "Rifle";
      }

      state.types = state.types.map((type) =>
        type.name === skin.weapon_type
          ? {
              name: type.name,
              weapons: type.weapons.map((weapon) =>
                weapon.name === skin.gun_type
                  ? { name: skin.gun_type, skin }
                  : weapon
              ),
            }
          : type
      );

      AsyncStorage.setItem(state.id, JSON.stringify(state.types));
    },
    removeSkin(state, { payload }) {
      state.types = state.types.map((type) =>
        type.name === payload.weapon_type
          ? {
              name: type.name,
              weapons: type.weapons.map((weapon) =>
                weapon.name === payload.gun_type
                  ? { name: payload.gun_type, skin: null }
                  : weapon
              ),
            }
          : type
      );

      AsyncStorage.setItem(state.id, JSON.stringify(state.types));
    },
    calculatePrice(state) {
      let price = 0;

      for (const type of state.types) {
        for (const weapon of type.weapons) {
          if (weapon?.skin?.price["24_hours"]) {
            price += weapon.skin.price["24_hours"].average;
          } else if (weapon?.skin?.price["30_days"]) {
            price += weapon.skin.price["30_days"].average;
          } else if (weapon?.skin?.price["all_time"]) {
            price += weapon.skin.price["all_time"].average;
          }
        }
      }

      state.price = price;
    },
    showSkinDetail(state, { payload }) {
      state.skinDetail = payload;
    },
    hideSkinDetail(state) {
      state.skinDetail = null;
    },
  },
  extraReducers: {
    [fetchLoadout.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.types = payload.types;
      state.id = payload.id;
    },
    [fetchLoadout.pending]: (state) => {
      state.status = "pending";
    },
  },
});

export const {
  addSkin,
  removeSkin,
  calculatePrice,
  showSkinDetail,
  hideSkinDetail,
} = loadoutDetailSlice.actions;

export default loadoutDetailSlice.reducer;
