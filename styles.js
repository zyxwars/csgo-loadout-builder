import { StyleSheet } from "react-native";

import { defaultTheme as theme } from "./theme";

export default globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerAbsolute: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    top: 0,
  },
  rowEven: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textThin: {
    color: theme.accentColor,
    fontFamily: "roboto-thin",
  },
  textLight: {
    color: theme.accentColor,
    fontFamily: "roboto-light",
  },
});
