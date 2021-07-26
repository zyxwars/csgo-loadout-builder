import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { fetchSkins } from "../redux/skinsSlice";
import { addSkin } from "../redux/loadoutDetailSlice";
import { stripName } from "../utils/validators";
import { orderByExterior } from "../utils/helpers";
import CustomTextInput from "../components/CustomTextInput";
import SkinTile from "../components/SkinTile";
import SkinRow from "../components/SkinRow";
import { defaultTheme as theme } from "../theme";

export default function Skins({ route, navigation }) {
  const dispatch = useDispatch();

  const { weaponType } = route.params;
  const skins = useSelector((state) => state.skins);
  const [groupedSkins, setGroupedSkins] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    if (skins.skins.length > 0) return;

    dispatch(fetchSkins());
  }, []);

  useEffect(() => {
    const filteredSkins = skins.skins.filter((skin) => {
      if (
        weaponType === "Terrorist gloves" ||
        weaponType === "Counter-terrorist gloves"
      )
        return skin.type === "Gloves";
      if (
        weaponType === "Terrorist knife" ||
        weaponType === "Counter-terrorist knife"
      )
        return skin.weapon_type === "Knife";
      // Temporary fix until csgobackpack updates api
      if (
        weaponType === "Terrorist agent" ||
        weaponType === "Counter-terrorist agent"
      )
        return (
          skin.type == null &&
          !skin.name.includes("Patch") &&
          !skin.name.includes("Sticker") &&
          !skin.name.includes("Operation") &&
          skin.name !== "Swap Tool" &&
          skin.name !== "Name Tag"
        );

      return skin.gun_type === weaponType;
    });

    const groupedSkins = filteredSkins.reduce((groupedSkins, skin) => {
      const cleanedName = stripName(skin.name);

      search: {
        for (banana of groupedSkins) {
          if (banana.name === cleanedName) {
            banana.skins.push(skin);
            break search;
          }
        }

        groupedSkins.push({
          name: cleanedName,
          skins: [skin],
        });
      }

      return groupedSkins;
    }, []);

    setGroupedSkins(groupedSkins);
  }, [skins]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <CustomTextInput
        style={{ backgroundColor: "black" }}
        placeholder="Search..."
        value={searchFilter}
        onChangeText={setSearchFilter}
      />

      {skins.status === "fulfilled" && groupedSkins ? (
        <FlatList
          data={groupedSkins.filter((milk) =>
            milk.name.toLowerCase().includes(searchFilter.toLowerCase())
          )}
          renderItem={({ item }) => (
            <SkinRow
              rowName={item.name}
              childrenData={orderByExterior(item.skins)}
              childRenderItem={({ item }) => (
                <SkinTile
                  skin={item}
                  onPress={() => {
                    dispatch(
                      addSkin({
                        ...item,
                        ...(item.type === "Gloves" && {
                          weapon_type: "Gloves",
                          gun_type: weaponType,
                        }),
                        ...(item.weapon_type === "Knife" && {
                          gun_type: weaponType,
                        }),
                        ...(item.weapon_type == null && {
                          weapon_type: "Agent",
                          gun_type: weaponType,
                        }),
                      })
                    );
                    navigation.goBack();
                  }}
                />
              )}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={80} color="black" />
        </View>
      )}
    </View>
  );
}
