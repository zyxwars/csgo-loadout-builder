import React from "react";
import {
  View,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

import { defaultTheme as theme } from "../theme";
import CustomButton from "./CustomButton";
import SkinImage from "./SkinImage";
import SkinText from "./SkinText";

export default function SkinDetail({
  skin,
  closeModalCallback,
  sellSkinCallback,
  changeSkinCallback,
}) {
  const detailSize = Dimensions.get("window").width - 32;

  return (
    <Modal animationType="slide" transparent={true} visible={!!skin}>
      {skin && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableWithoutFeedback onPress={closeModalCallback}>
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
              width: detailSize,
              height: detailSize,
              justifyContent: "center",
              alignItems: "center",

              borderWidth: 4,
              borderColor: theme.navigationColor,
              backgroundColor: theme.backgroundColor,
            }}
          >
            <SkinImage
              style={{ width: detailSize - 80, height: detailSize - 160 }}
              iconUrl={skin.icon_url}
            />
            <SkinText style={{ fontSize: 20 }} skin={skin} />
            <View
              style={{
                width: detailSize,
                marginTop: 16,

                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <CustomButton
                text="Sell"
                style={{ width: 150 }}
                onPress={sellSkinCallback}
              />
              <CustomButton
                text="Change"
                style={{ width: 150 }}
                onPress={changeSkinCallback}
              />
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
}
