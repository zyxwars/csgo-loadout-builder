import React from "react";
import { Text } from "react-native";

import { validatePrice } from "../utils/validators";
import { defaultTheme as theme } from "../theme";
import globalStyles from "../styles";

export default function SkinText({ style, skin }) {
  return (
    <Text
      style={{
        ...globalStyles.textLight,
        textAlign: "center",
        ...style,
      }}
    >
      {skin.name} | {validatePrice(skin.price).toFixed(2)} €
    </Text>
  );
}
