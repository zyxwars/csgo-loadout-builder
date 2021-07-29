import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import { defaultTheme as theme } from "../theme";
import {
  createLoadout,
  updateLoadout,
  deleteLoadout,
  fetchLoadouts,
} from "../redux/loadoutsSlice";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";

export default function Home({ navigation }) {
  const modalSize = Dimensions.get("window").width - 32;
  const dispatch = useDispatch();

  const loadouts = useSelector((state) => state.loadouts);
  const [loadoutName, setLoadoutName] = useState("");
  const initialLoadoutState = { id: "", name: "" };
  const [updatedLoadout, setUpdatedLoadout] = useState(initialLoadoutState);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    dispatch(fetchLoadouts());
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        alignItems: "center",

        backgroundColor: theme.secondBackgroundColor,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.push("Loadout", {
            idLoadout: item.id,
            loadoutName: item.name,
          })
        }
        style={{ flex: 1 }}
      >
        <Text
          style={{
            fontSize: 32,
            fontFamily: "roboto-thin",
            color: theme.accentColor,
            paddingLeft: 10,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: 80,

          backgroundColor: theme.accentColor,
        }}
        onPress={() => {
          setUpdatedLoadout((updatedLoadout) => ({
            ...updatedLoadout,
            id: item.id,
            name: item.name,
          }));
          setShowSettings(true);
        }}
      >
        <FontAwesome name="gear" size={24} color={theme.backgroundColor} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <Modal animationType="slide" transparent={true} visible={showSettings}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableWithoutFeedback onPress={() => setShowSettings(false)}>
            <View
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                left: 0,
                top: 0,
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              width: modalSize,
              height: modalSize,
              justifyContent: "center",
              alignItems: "center",

              borderWidth: 4,
              borderColor: theme.navigationColor,
              backgroundColor: theme.backgroundColor,
            }}
          >
            <CustomTextInput
              placeholder="Name..."
              value={updatedLoadout.name}
              onChangeText={(text) =>
                setUpdatedLoadout((updatedLoadout) => ({
                  ...updatedLoadout,
                  name: text,
                }))
              }
              style={{ width: modalSize - 50 }}
            />
            <View
              style={{
                width: modalSize,
                marginTop: 16,

                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <CustomButton
                text="Delete"
                onPress={() => {
                  dispatch(deleteLoadout(updatedLoadout.id));
                  setUpdatedLoadout(initialLoadoutState);
                  setShowSettings(false);
                }}
                style={{ width: 150 }}
              />
              <CustomButton
                text="Save"
                onPress={() => {
                  dispatch(updateLoadout(updatedLoadout));
                  setUpdatedLoadout(initialLoadoutState);
                  setShowSettings(false);
                }}
                style={{ width: 150 }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Text
        style={{
          marginTop: 10,
          textAlign: "center",
          color: theme.accentColor,
          fontSize: 32,
          fontFamily: "roboto-thin",
        }}
      >
        Create Loadout
      </Text>
      <View
        style={{
          width: "100%",
          height: 1,
          marginVertical: 5,
          backgroundColor: theme.accentColor,
        }}
      />

      <View style={{ flexDirection: "row", margin: 10 }}>
        <CustomTextInput
          style={{ flex: 1 }}
          placeholder="Name..."
          onChangeText={setLoadoutName}
          value={loadoutName}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 60,

            backgroundColor: theme.accentColor,
          }}
          onPress={() => {
            dispatch(createLoadout({ name: loadoutName }));
            setLoadoutName("");
          }}
        >
          <FontAwesome name="check" size={24} color={theme.backgroundColor} />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          textAlign: "center",
          color: theme.accentColor,
          fontSize: 32,
          fontFamily: "roboto-thin",
        }}
      >
        Loadouts
      </Text>
      <View
        style={{
          width: "100%",
          height: 1,
          marginVertical: 5,
          backgroundColor: theme.accentColor,
        }}
      />

      {loadouts.status === "fulfilled" ? (
        <FlatList
          data={loadouts.loadouts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",

            backgroundColor: "#151518",
          }}
        >
          <ActivityIndicator size={80} color="black" />
        </View>
      )}
    </View>
  );
}
