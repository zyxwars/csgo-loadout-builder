import React from "react";
import { TouchableOpacity, Text } from "react-native";

import { defaultTheme as theme } from "../theme";

export default function CustomButton({ style, textStyle, text, onPress }) {
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,

        backgroundColor: theme.navigationColor,

        ...style,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          textAlign: "center",
          color: theme.accentColor,
          fontFamily: "roboto-light",
          fontSize: 16,

          ...textStyle,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
