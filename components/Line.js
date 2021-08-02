import React from "react";
import { View } from "react-native";

import { defaultTheme as theme } from "../theme";

export default function Line() {
  return (
    <View
      style={{
        width: "100%",
        height: 1,
        marginVertical: 5,
        backgroundColor: theme.accentColor,
      }}
    />
  );
}
