import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { fetchSkins } from "../redux/skinsSlice";
import { addSkin } from "../redux/loadoutDetailSlice";

export default function Skins({ route, navigation }) {
  const dispatch = useDispatch();

  const { gunType } = route.params;
  const skins = useSelector((state) => state.skins);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        dispatch(addSkin(item));
        navigation.goBack();
      }}
    >
      <Text style={{ fontFamily: "roboto-thin", color: "white" }}>
        {item.name} |{" "}
        {item.price["24_hours"]
          ? `${item.price["24_hours"].average}`
          : item.price["30_days"]
          ? item.price["30_days"].average
          : item.price.all_time.average}
        €
      </Text>

      <Image
        style={{ width: 150, height: 100 }}
        source={{
          uri: `https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}`,
        }}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    if (skins.skins.length > 0) return;

    dispatch(fetchSkins());
  }, []);

  return (
    <>
      {skins.status === "fulfilled" ? (
        <FlatList
          style={{ backgroundColor: "#151518" }}
          data={skins.skins.filter((skin) => skin.gun_type === gunType)}
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
