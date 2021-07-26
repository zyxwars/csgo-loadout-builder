import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { defaultTheme as theme } from "../theme";

import {
  createLoadout,
  deleteLoadout,
  fetchLoadouts,
} from "../redux/loadoutsSlice";
import CustomTextInput from "../components/CustomTextInput";

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  const loadouts = useSelector((state) => state.loadouts);
  const [loadoutName, setLoadoutName] = useState("");

  useEffect(() => {
    dispatch(fetchLoadouts());
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 15,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.push("Loadout", {
            idLoadout: item.id,
            loadoutName: item.name,
          })
        }
        style={{ flex: 1 }}
      >
        <Text
          style={{ fontSize: 32, fontFamily: "roboto-thin", color: theme.secondAccentColor }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => dispatch(deleteLoadout(item.id))}>
        <FontAwesome name="times" size={24} color={theme.secondAccentColor} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <View style={{ flexDirection: "row", margin: 10 }}>
        <CustomTextInput
          style={{ flex: 1 }}
          placeholder="Name..."
          onChangeText={setLoadoutName}
          value={loadoutName}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 60,

            backgroundColor: theme.secondAccentColor,
          }}
          onPress={() => {
            dispatch(createLoadout({ name: loadoutName }));
            setLoadoutName("");
          }}
        >
          <FontAwesome name="check" size={24} color={theme.backgroundColor} />
        </TouchableOpacity>
      </View>

      {loadouts.status === "fulfilled" ? (
        <FlatList
          data={loadouts.loadouts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
    </View>
  );
}
