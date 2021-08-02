import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  fetchLoadout,
  calculatePrice,
  hideSkinDetail,
  removeSkin,
} from "../../redux/loadoutDetailSlice";
import { defaultTheme as theme } from "../../theme";
import SkinDetail from "../../components/SkinDetail";
import SkinRow from "../../components/SkinRow";
import Weapon from "./Weapon";
import Loading from "../../components/Loading";

export default function Loadout({ route, navigation }) {
  const dispatch = useDispatch();

  const { idLoadout, loadoutName } = route.params;
  const loadout = useSelector((state) => state.loadout);

  useEffect(() => {
    dispatch(fetchLoadout(idLoadout));
  }, [idLoadout]);

  useEffect(() => {
    if (loadout.status === "pending") {
      navigation.setOptions({ title: "Loading..." });
      return;
    }
    dispatch(calculatePrice());
    navigation.setOptions({
      title: `${loadoutName} - ${loadout.price.toFixed(2)}€`,
    });
  }, [loadout]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.backgroundColor,
      }}
    >
      <SkinDetail
        skin={loadout.skinDetail}
        closeModalCallback={() => dispatch(hideSkinDetail())}
        sellSkinCallback={() => {
          dispatch(removeSkin(loadout?.skinDetail));
          dispatch(hideSkinDetail());
        }}
        changeSkinCallback={() => {
          dispatch(hideSkinDetail());
          navigation.push("Skins", {
            weaponType: loadout?.skinDetail?.gun_type,
          });
        }}
      />

      {loadout.status === "fulfilled" ? (
        <>
          <FlatList
            data={loadout.types}
            renderItem={({ item }) => (
              <SkinRow
                rowName={item.name}
                childrenData={item.weapons}
                childRenderItem={({ item }) => (
                  <Weapon navigation={navigation} weapon={item} />
                )}
              />
            )}
            keyExtractor={(item) => item.name}
          />
        </>
      ) : (
        <Loading />
      )}
    </View>
  );
}
