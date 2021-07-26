import React from "react";
import { Image } from "react-native";

export default function SkinImage({ style, iconUrl }) {
  return (
    <Image
      style={{ ...style }}
      source={{
        uri: `https://community.akamai.steamstatic.com/economy/image/${iconUrl}`,
      }}
    />
  );
}
