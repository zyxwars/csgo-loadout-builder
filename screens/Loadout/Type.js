import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import Weapon from "./Weapon";

export default function Type({ navigation, type }) {
  const renderItem = ({ item }) => (
    <Weapon navigation={navigation} weapon={item} />
  );

  return (
    <View style={{ marginVertical: 4, marginHorizontal: 4, borderRadius: 5 }}>
      <Text
        style={{
          marginBottom: 8,
          textAlign: "center",
          color: "white",
          fontFamily: "roboto-thin",
          fontSize: 24,
        }}
      >
        {type.name}
      </Text>

      <FlatList
        horizontal={true}
        data={type.weapons}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      ></FlatList>
    </View>
  );
}
