import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { showSkinDetail } from "../../redux/loadoutDetailSlice";

export default function Weapon({ navigation, weapon }) {
  const dispatch = useDispatch();

  return (
    <>
      <View
        style={{
          width: containerSize,
          height: containerSize,
          marginHorizontal: 4,

          backgroundColor: "#000000",
        }}
      >
        {weapon.skin ? (
          <TouchableOpacity
            style={styles.weaponImageContainer}
            onPress={() => dispatch(showSkinDetail(weapon.skin))}
          >
            <Image
              style={{ width: 150, height: 100 }}
              source={{
                uri: `https://steamcommunity-a.akamaihd.net/economy/image/${weapon.skin.icon_url}`,
              }}
            />
            <Text style={styles.weaponName}>
              {weapon.skin.name} |{" "}
              {weapon.skin.price["24_hours"]
                ? `${weapon.skin.price["24_hours"].average}`
                : weapon.skin.price["30_days"]
                ? weapon.skin.price["30_days"].average
                : weapon.skin.price.all_time.average}
              €
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.weaponImageContainer}
            onPress={() => navigation.push("Skins", { gunType: weapon.name })}
          >
            <Foundation name="plus" color="#151518" size={100} />
            <Text style={styles.weaponName}>{weapon.name}</Text>
          </TouchableOpacity>
        )}
      </View>
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

    color: "white",
    fontFamily: "roboto-thin",
    fontSize: 16,
  },
});
