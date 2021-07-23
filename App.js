import "react-native-gesture-handler";
import "react-native-get-random-values";

import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { store } from "./redux/store";
import Home from "./screens/Home";
import Loadout from "./screens/Loadout/Loadout";
import Skins from "./screens/Skins";

const getFonts = () =>
  Font.loadAsync({
    "roboto-thin": require("./assets/fonts/Roboto-Thin.ttf"),
  });

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: "black",
              },
              headerTintColor: "white",
              headerTitleStyle: {
                fontFamily: "roboto-thin",
              },
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Loadout" component={Loadout} />
            <Stack.Screen name="Skins" component={Skins} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(e) => console.log(e)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
