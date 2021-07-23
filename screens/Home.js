import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import {
  createLoadout,
  deleteLoadout,
  fetchLoadouts,
} from "../redux/loadoutsSlice";

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
          style={{ fontSize: 32, fontFamily: "roboto-thin", color: "white" }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => dispatch(deleteLoadout(item.id))}>
        <FontAwesome name="times" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#151518" }}>
      <View style={{ flexDirection: "row", margin: 10 }}>
        <TextInput
          style={styles.textInput}
          placeholder="Name..."
          placeholderTextColor="white"
          onChangeText={setLoadoutName}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,

            backgroundColor: "white",
          }}
          onPress={() => {
            dispatch(createLoadout({ name: loadoutName }));
            setLoadoutName("");
          }}
        >
          <FontAwesome name="check" size={24} color="#151518" />
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

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    flex: 1,

    fontFamily: "roboto-thin",
    fontSize: 16,
    color: "white",
    backgroundColor: "black",
  },
});
