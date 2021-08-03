import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import SkinImage from "./SkinImage";
import SkinText from "./SkinText";
import { defaultTheme as theme } from "../theme";
import { validateQuantitySold } from "../utils/validators";

export default function SkinTileHorizontal({ skin, onPress }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        margin: 8,
        padding: 8,
        backgroundColor: theme.secondBackgroundColor,
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 2,
        borderColor: `#${skin.rarity_color}`,
      }}
      onPress={onPress}
    >
      <SkinImage style={{ width: 150, height: 100 }} iconUrl={skin.icon_url} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SkinText skin={skin} />
        <Text style={{ fontFamily: "roboto-thin", color: theme.accentColor }}>
          (Quantity sold: {validateQuantitySold(skin.price)})
        </Text>
      </View>
    </TouchableOpacity>
  );
}
