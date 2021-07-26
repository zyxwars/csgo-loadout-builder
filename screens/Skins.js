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

  const { gunType } = route.params;
  const skins = useSelector((state) => state.skins);
  const [groupedSkins, setGroupedSkins] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    if (skins.skins.length > 0) return;

    dispatch(fetchSkins());
  }, []);

  useEffect(() => {
    const filteredSkins = skins.skins.filter(
      (skin) => skin.gun_type === gunType
    );

    const groupedSkins = filteredSkins.reduce((groupedSkins, skin) => {
      const cleanedName = stripName(skin.name);

      search: {
        for (skinGroup of groupedSkins) {
          if (skinGroup.name === cleanedName) {
            skinGroup.skins.push(skin);
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
          data={groupedSkins.filter((skinGroup) =>
            skinGroup.name.toLowerCase().includes(searchFilter.toLowerCase())
          )}
          renderItem={({ item }) => (
            <SkinRow
              rowName={item.name}
              childrenData={orderByExterior(item.skins)}
              childRenderItem={({ item }) => (
                <SkinTile
                  skin={item}
                  onPress={() => {
                    dispatch(addSkin(item));
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
