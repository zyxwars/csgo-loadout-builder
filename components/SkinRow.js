import React from "react";
import { View, Text, FlatList } from "react-native";

import { defaultTheme as theme } from "../theme";

export default function SkinRow({ rowName, childrenData, childRenderItem }) {
  return (
    <View style={{ marginVertical: 4, marginHorizontal: 8, borderRadius: 5 }}>
      <Text
        style={{
          marginTop: 4,
          marginBottom: 4,
          textAlign: "center",
          color: theme.secondAccentColor,
          fontFamily: "roboto-thin",
          fontSize: 24,
        }}
      >
        {rowName}
      </Text>
      <FlatList
        horizontal={true}
        data={childrenData}
        renderItem={childRenderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}
