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
import { validatePrice, stripName } from "../utils/validators";
import { orderByExterior } from "../utils/helpers";

export default function Skins({ route, navigation }) {
  const dispatch = useDispatch();

  const { gunType } = route.params;
  const skins = useSelector((state) => state.skins);
  const [groupedSkins, setGroupedSkins] = useState(null);

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

  const renderItem2 = ({ item }) => (
    <View
      style={{
        width: containerSize,
        height: containerSize,
        marginHorizontal: 4,

        backgroundColor: "#000000",
      }}
    >
      <TouchableOpacity
        style={styles.weaponImageContainer}
        onPress={() => {
          dispatch(addSkin(item));
          navigation.goBack();
        }}
      >
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            uri: `https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}`,
          }}
        />
        <Text style={styles.weaponName}>
          {item.name} | {validatePrice(item.price)}€
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <>
      <Text
        style={{
          fontSize: 24,
          fontFamily: "roboto-thin",
          color: "white",
          textAlign: "center",
        }}
      >
        {item.name}
      </Text>
      <FlatList
        horizontal={true}
        data={orderByExterior(item.skins)}
        renderItem={renderItem2}
        keyExtractor={(item) => item.name}
      />
    </>
  );

  return (
    <>
      {skins.status === "fulfilled" && groupedSkins ? (
        <FlatList
          style={{ backgroundColor: "#151518" }}
          data={groupedSkins}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",

            backgroundColor: "#151518",
          }}
        >
          <ActivityIndicator size={80} color="black" />
        </View>
      )}
    </>
  );
}

const containerSize = 175;

const styles = StyleSheet.create({
  weaponImageContainer: {
    width: containerSize,
    height: containerSize,

    justifyContent: "center",
    alignItems: "center",
  },
  weaponName: {
    position: "absolute",
    bottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    textAlign: "center",

    color: "white",
    fontFamily: "roboto-thin",
    fontSize: 16,
  },
});
