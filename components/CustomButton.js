import React from "react";
import { TouchableOpacity, Text } from "react-native";

import { defaultTheme as theme } from "../theme";
import globalStyles from "../styles";

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
          ...globalStyles.textLight,
          textAlign: "center",
          fontSize: 16,
          ...textStyle,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
