import React from "react";
import { View, ActivityIndicator } from "react-native";

import { defaultTheme as theme } from "../theme";
import globalStyles from "../styles";

export default function Loading({ transparent = false }) {
  return (
    <View
      style={{
        ...globalStyles.container,
        ...(!transparent && { backgroundColor: theme.backgroundColor }),
      }}
    >
      <ActivityIndicator size={80} color={theme.navigationColor} />
    </View>
  );
}
