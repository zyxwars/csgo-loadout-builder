import React from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { defaultTheme as theme } from "../theme";
import globalStyles from "../styles";

export default function CustomTextInput({
  style,
  placeholder = "",
  onChangeText,
  value,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: theme.secondBackgroundColor,
        ...style,
      }}
    >
      <TextInput
        style={{
          ...globalStyles.textThin,
          flex: 1,
          fontSize: 16,
        }}
        placeholder={placeholder}
        placeholderTextColor={theme.accentColor}
        onChangeText={onChangeText}
        value={value}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <FontAwesome name="times" size={24} color={theme.accentColor} />
        </TouchableOpacity>
      )}
    </View>
  );
}
