import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
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
import { fetchSkins } from "../redux/skinsSlice";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import globalStyles from "../styles";
import Line from "../components/Line";
import Loading from "../components/Loading";

export default function Home({ navigation }) {
  const modalSize = Dimensions.get("window").width - 32;
  const dispatch = useDispatch();

  const loadouts = useSelector((state) => state.loadouts);
  const skins = useSelector((state) => state.skins);

  const [loadoutName, setLoadoutName] = useState("");
  const initialLoadoutState = { id: "", name: "" };
  const [updatedLoadout, setUpdatedLoadout] = useState(initialLoadoutState);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    dispatch(fetchLoadouts());

    if (skins.skins.length > 0) return;
    dispatch(fetchSkins());
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={{
        margin: 10,
        flexDirection: "row",
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
            ...globalStyles.textThin,
            fontSize: 32,
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
        <FontAwesome name="gear" size={32} color={theme.backgroundColor} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <Modal animationType="slide" transparent={true} visible={showSettings}>
        <View
          style={{
            ...globalStyles.container,
          }}
        >
          <TouchableWithoutFeedback onPress={() => setShowSettings(false)}>
            <View
              style={{
                ...globalStyles.containerAbsolute,
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
                ...globalStyles.rowEven,
                width: modalSize,
                marginTop: 16,
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
          ...globalStyles.textThin,
          marginTop: 10,
          fontSize: 32,
          textAlign: "center",
        }}
      >
        Create Loadout
      </Text>
      <Line />

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
          ...globalStyles.textThin,
          fontSize: 32,
          textAlign: "center",
        }}
      >
        Loadouts
      </Text>
      <Line />

      {loadouts.status === "fulfilled" ? (
        <FlatList
          data={loadouts.loadouts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
}
