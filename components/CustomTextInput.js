import React from "react";
import { TextInput } from "react-native";

import { defaultTheme as theme } from "../theme";

export default function CustomTextInput({
  style,
  placeholder = "",
  onChangeText,
  value,
}) {
  return (
    <TextInput
      style={{
        padding: 16,

        fontFamily: "roboto-thin",
        fontSize: 16,
        color: theme.accentColor,
        backgroundColor: theme.secondBackgroundColor,
        ...style,
      }}
      placeholder={placeholder}
      placeholderTextColor={theme.accentColor}
      onChangeText={onChangeText}
      value={value}
    />
  );
}
