import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { validatePrice } from "../utils/validators";

export const loadoutModel = [
  {
    name: "Pistol",
    weapons: [
      { name: "Glock-18", skinName: null, skin: null },
      { name: "USP-S", skinName: null, skin: null },
      { name: "P2000", skinName: null, skin: null },
      { name: "Dual Berettas", skinName: null, skin: null },
      { name: "P250", skinName: null, skin: null },
      { name: "Five-SeveN", skinName: null, skin: null },
      { name: "Tec-9", skinName: null, skin: null },
      { name: "CZ75-Auto", skinName: null, skin: null },
      { name: "Desert Eagle", skinName: null, skin: null },
      { name: "R8 Revolver", skinName: null, skin: null },
    ],
  },
  {
    name: "SMG",
    weapons: [
      { name: "MAC-10", skinName: null, skin: null },
      { name: "MP9", skinName: null, skin: null },
      { name: "MP7", skinName: null, skin: null },
      { name: "MP5-SD", skinName: null, skin: null },
      { name: "UMP-45", skinName: null, skin: null },
      { name: "P90", skinName: null, skin: null },
      { name: "PP-Bizon", skinName: null, skin: null },
    ],
  },

  {
    name: "Rifle",
    weapons: [
      { name: "Galil AR", skinName: null, skin: null },
      { name: "FAMAS", skinName: null, skin: null },
      { name: "SSG 08", skinName: null, skin: null },
      { name: "AK-47", skinName: null, skin: null },
      { name: "M4A4", skinName: null, skin: null },
      { name: "M4A1-S", skinName: null, skin: null },
      { name: "SG 553", skinName: null, skin: null },
      { name: "AUG", skinName: null, skin: null },
      { name: "AWP", skinName: null, skin: null },
      { name: "G3SG1", skinName: null, skin: null },
      { name: "SCAR-20", skinName: null, skin: null },
    ],
  },
  {
    name: "Heavy",
    weapons: [
      { name: "Nova", skinName: null, skin: null },
      { name: "XM1014", skinName: null, skin: null },
      { name: "Sawed-Off", skinName: null, skin: null },
      { name: "MAG-7", skinName: null, skin: null },
      { name: "M249", skinName: null, skin: null },
      { name: "Negev", skinName: null, skin: null },
    ],
  },
  {
    name: "Knife",
    weapons: [
      { name: "Terrorist knife", skinName: null, skin: null },
      { name: "Counter-terrorist knife", skinName: null, skin: null },
    ],
  },
  {
    name: "Gloves",
    weapons: [
      { name: "Terrorist gloves", skinName: null, skin: null },
      { name: "Counter-terrorist gloves", skinName: null, skin: null },
    ],
  },
  {
    name: "Agent",
    weapons: [
      { name: "Terrorist agent", skinName: null, skin: null },
      { name: "Counter-terrorist agent", skinName: null, skin: null },
    ],
  },
];

const initialState = {
  status: "pending",
  id: null,
  price: 0,
  skinDetail: null,
  types: loadoutModel,
};

export const fetchLoadout = createAsyncThunk(
  "loadout/fetchLoadout",
  async ({ idLoadout, skins }) => {
    const loadout = await AsyncStorage.getItem(idLoadout);

    if (!loadout) return { id: idLoadout, types: loadoutModel };

    const parsedTypes = JSON.parse(loadout);

    return {
      id: idLoadout,
      types: await parsedTypes.reduce((acc, type) => {
        return [
          ...acc,
          {
            ...type,
            weapons: type.weapons.reduce((acc, weapon) => {
              return [...acc, { ...weapon, skin: skins[weapon.skinName] }];
            }, []),
          },
        ];
      }, []),
    };
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
              ...type,
              weapons: type.weapons.map((weapon) =>
                weapon.name === skin.gun_type
                  ? { ...weapon, skinName: skin.name, skin }
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
          price += validatePrice(weapon?.skin?.price);
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
