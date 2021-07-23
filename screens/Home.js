import React, { useEffect } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  createLoadout,
  deleteLoadout,
  fetchLoadouts,
} from "../redux/loadoutsSlice";

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  const loadouts = useSelector((state) => state.loadouts);

  useEffect(() => {
    dispatch(fetchLoadouts());
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.push("Loadout", {
            idLoadout: item.id,
            loadoutName: item.name,
          })
        }
      >
        <Text style={{ fontSize: 32 }}>{item.name}</Text>
      </TouchableOpacity>

      <Button title="Remove" onPress={() => dispatch(deleteLoadout(item.id))} />
    </View>
  );

  return (
    <View>
      <Button
        title="Create loadout"
        onPress={() => dispatch(createLoadout({ name: "Test loadout" }))}
      />
      {loadouts.status === "fulfilled" ? (
        <FlatList
          data={loadouts.loadouts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
