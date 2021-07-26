import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { showSkinDetail } from "../../redux/loadoutDetailSlice";
import { validatePrice } from "../../utils/validators";
import SkinTile from "../../components/SkinTile";
import { defaultTheme as theme } from "../../theme";
import { ThemeProvider } from "@react-navigation/native";

export default function Weapon({ navigation, weapon }) {
  const dispatch = useDispatch();

  return (
    <>
      {weapon.skin ? (
        <SkinTile
          skin={weapon.skin}
          onPress={() => dispatch(showSkinDetail(weapon.skin))}
        />
      ) : (
        <TouchableOpacity
          style={{
            width: 160,
            height: 160,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 16,
            marginRight: 8,

            backgroundColor: theme.secondBackgroundColor,
          }}
          onPress={() => navigation.push("Skins", { gunType: weapon.name })}
        >
          <Foundation name="plus" color={theme.backgroundColor} size={100} />

          <Text style={styles.weaponName}>{weapon.name}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const containerSize = 175;

const styles = StyleSheet.create({
  weaponImageContainer: {
    width: containerSize,
    height: containerSize,

    justifyContent: "center",
    alignItems: "center",
  },
  weaponName: {
    position: "absolute",
    bottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    textAlign: "center",

    color: theme.accentColor,
    fontFamily: "roboto-thin",
    fontSize: 16,
  },
});
