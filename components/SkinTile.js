import React from "react";
import { TouchableOpacity } from "react-native";

import { defaultTheme as theme } from "../theme";
import SkinImage from "./SkinImage";
import SkinText from "./SkinText";

export default function SkinTile({ skin, onPress }) {
  return (
    <TouchableOpacity
      style={{
        width: 160,
        height: 160,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 16,
        marginRight: 8,

        borderWidth: 2,
        borderColor: `#${skin.rarity_color}`,
        backgroundColor: theme.secondBackgroundColor,
      }}
      onPress={onPress}
    >
      <SkinImage style={{ width: 150, height: 100 }} iconUrl={skin.icon_url} />

      <SkinText
        style={{
          position: "absolute",
          bottom: 4,
          left: 0,
          right: 0,
          marginHorizontal: 8,

          textAlign: "center",
          fontSize: 12,
        }}
        skin={skin}
      />
    </TouchableOpacity>
  );
}
