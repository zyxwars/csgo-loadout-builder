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
import globalStyles from "../styles";

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
        <View style={globalStyles.container}>
          <TouchableWithoutFeedback onPress={closeModalCallback}>
            <View style={globalStyles.containerAbsolute} />
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
                ...globalStyles.rowEven,
                width: detailSize,
                marginTop: 16,
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
