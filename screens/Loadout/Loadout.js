import React, { useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Modal,
  Button,
  Text,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  fetchLoadout,
  calculatePrice,
  hideSkinDetail,
  removeSkin,
} from "../../redux/loadoutDetailSlice";
import Type from "./Type";

export default function Loadout({ route, navigation }) {
  const dispatch = useDispatch();

  const { idLoadout, loadoutName } = route.params;
  const loadout = useSelector((state) => state.loadout);

  const renderItem = ({ item }) => <Type navigation={navigation} type={item} />;

  useEffect(() => {
    dispatch(fetchLoadout(idLoadout));
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: loadoutName });
  }, [idLoadout]);

  useEffect(() => {
    if (loadout.status === "pending") {
      navigation.setOptions({ title: "Loading..." });
      return;
    }

    dispatch(calculatePrice());
    navigation.setOptions({
      title: `${loadoutName} - ${loadout.price.toFixed(2)}€`,
    });
  }, [loadout]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#151518",
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={loadout.skinDetail != null}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 300, height: 200 }}
            source={{
              uri: `https://steamcommunity-a.akamaihd.net/economy/image/${loadout?.skinDetail?.icon_url_large}`,
            }}
          />
          <Text
            style={{ color: "white", fontSize: 16, fontFamily: "roboto-thin" }}
          >
            {loadout?.skinDetail?.name}
          </Text>
          <Button
            title="Change"
            onPress={() => {
              dispatch(hideSkinDetail());

              navigation.push("Skins", {
                gunType: loadout?.skinDetail?.gun_type,
              });
            }}
          />
          <Button
            title="Remove"
            onPress={() => {
              dispatch(removeSkin(loadout?.skinDetail));
              dispatch(hideSkinDetail());
            }}
          />
          <Button title="Close" onPress={() => dispatch(hideSkinDetail())} />
        </View>
      </Modal>

      {loadout.status === "fulfilled" ? (
        <>
          <FlatList
            data={loadout.types}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
          />
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={80} color="black" />
        </View>
      )}
    </View>
  );
}
