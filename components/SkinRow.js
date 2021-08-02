import React from "react";
import { View, Text, FlatList } from "react-native";

import { defaultTheme as theme } from "../theme";
import globalStyles from "../styles";

export default function SkinRow({ rowName, childrenData, childRenderItem }) {
  return (
    <View style={{ marginVertical: 4, marginHorizontal: 8, borderRadius: 5 }}>
      <Text
        style={{
          ...globalStyles.textThin,
          marginTop: 4,
          marginBottom: 4,
          fontSize: 24,
          textAlign: "center",
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
