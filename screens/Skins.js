import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { fetchSkins } from "../redux/skinsSlice";
import { addSkin } from "../redux/loadoutDetailSlice";
import { stripName } from "../utils/validators";
import {
  orderByExterior,
  orderByPrice,
  orderByRarity,
  orderByQuantitySold,
} from "../utils/helpers";
import CustomTextInput from "../components/CustomTextInput";
import SkinTile from "../components/SkinTile";
import SkinRow from "../components/SkinRow";
import { defaultTheme as theme } from "../theme";
import Loading from "../components/Loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import SkinRowTile from "../components/SkinRowTile";

export default function Skins({ route, navigation }) {
  const dispatch = useDispatch();

  const { weaponType } = route.params;
  const skins = useSelector((state) => state.skins);
  const [filteredSkins, setFilteredSkins] = useState(null);
  const [groupedSkins, setGroupedSkins] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");

  const orderStates = {
    ALPHABET: "ALPHABET",
    PRICE: "PRICE",
    SOLD: "SOLD",
    RARITY: "RARITY",
  };
  const orderStatesIndexed = Object.values(orderStates);
  const [order, setOrder] = useState(orderStates.ALPHABET);
  const [orderAscending, setOrderAscending] = useState(true);
  const changeOrder = () => {
    setOrder(
      (order) =>
        orderStatesIndexed[
          orderStatesIndexed.indexOf(order) + 1 >= orderStatesIndexed.length
            ? 0
            : orderStatesIndexed.indexOf(order) + 1
        ]
    );
  };

  useEffect(() => {
    if (skins.skins.length > 0) return;

    dispatch(fetchSkins());
  }, []);

  useEffect(() => {
    const filteredSkins = skins.skins.filter((skin) => {
      if (
        weaponType === "Terrorist gloves" ||
        weaponType === "Counter-terrorist gloves"
      )
        return skin.type === "Gloves";
      if (
        weaponType === "Terrorist knife" ||
        weaponType === "Counter-terrorist knife"
      )
        return skin.weapon_type === "Knife";
      // Temporary fix until csgobackpack updates api
      if (
        weaponType === "Terrorist agent" ||
        weaponType === "Counter-terrorist agent"
      )
        return (
          skin.type == null &&
          !skin.name.includes("Patch") &&
          !skin.name.includes("Sticker") &&
          !skin.name.includes("Operation") &&
          skin.name !== "Swap Tool" &&
          skin.name !== "Name Tag"
        );

      return skin.gun_type === weaponType;
    });

    setFilteredSkins(filteredSkins);

    const groupedSkins = filteredSkins.reduce((groupedSkins, skin) => {
      const cleanedName = stripName(skin.name);

      search: {
        for (const skinGroup of groupedSkins) {
          if (skinGroup.name === cleanedName) {
            skinGroup.skins.push(skin);
            break search;
          }
        }

        groupedSkins.push({
          name: cleanedName,
          skins: [skin],
        });
      }

      return groupedSkins;
    }, []);

    setGroupedSkins(groupedSkins);
  }, [skins]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <CustomTextInput
        style={{ backgroundColor: "black" }}
        placeholder="Search..."
        value={searchFilter}
        onChangeText={setSearchFilter}
      />

      <View
        style={{
          flexDirection: "row",
          padding: 5,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            padding: 5,
            justifyContent: "space-between",
          }}
          onPress={changeOrder}
        >
          {order === orderStates.ALPHABET ? (
            <>
              <MaterialCommunityIcons
                name="sort-alphabetical-variant"
                size={24}
                color={theme.accentColor}
              />
              <Text
                style={{
                  ...globalStyles.textLight,
                  fontSize: 16,
                  marginLeft: 8,
                }}
              >
                Order by name
              </Text>
            </>
          ) : order === orderStates.PRICE ? (
            <>
              <Entypo name="price-tag" size={24} color={theme.accentColor} />
              <Text
                style={{
                  ...globalStyles.textLight,
                  fontSize: 16,
                  marginLeft: 8,
                }}
              >
                Order by price
              </Text>
            </>
          ) : order === orderStates.SOLD ? (
            <>
              <Entypo
                name="shopping-cart"
                size={24}
                color={theme.accentColor}
              />
              <Text
                style={{
                  ...globalStyles.textLight,
                  fontSize: 16,
                  marginLeft: 8,
                }}
              >
                Order by quantity sold
              </Text>
            </>
          ) : (
            <>
              <FontAwesome name="diamond" size={24} color={theme.accentColor} />
              <Text
                style={{
                  ...globalStyles.textLight,
                  fontSize: 16,
                  marginLeft: 8,
                }}
              >
                Order by rarity
              </Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOrderAscending((orderAscending) => !orderAscending)}
        >
          {orderAscending ? (
            <AntDesign name="up" size={24} color={theme.accentColor} />
          ) : (
            <AntDesign name="down" size={24} color={theme.accentColor} />
          )}
        </TouchableOpacity>
      </View>

      {skins.status === "fulfilled" && groupedSkins ? (
        order === orderStates.ALPHABET ? (
          <FlatList
            data={
              orderAscending
                ? groupedSkins.reduce((filteredGroupedSkins, skinGroup) => {
                    filteredGroupedSkins.push({
                      name: skinGroup.name,
                      skins: skinGroup.skins.filter((skin) =>
                        skin.name
                          .toLowerCase()
                          .includes(searchFilter.toLowerCase())
                      ),
                    });

                    return filteredGroupedSkins;
                  }, [])
                : groupedSkins
                    .reduce((filteredGroupedSkins, skinGroup) => {
                      filteredGroupedSkins.push({
                        name: skinGroup.name,
                        skins: skinGroup.skins.filter((skin) =>
                          skin.name
                            .toLowerCase()
                            .includes(searchFilter.toLowerCase())
                        ),
                      });

                      return filteredGroupedSkins;
                    }, [])
                    .sort((a, b) => a.name < b.name)
            }
            renderItem={({ item }) => (
              <SkinRow
                rowName={item.name}
                childrenData={orderByExterior(item.skins, orderAscending)}
                childRenderItem={({ item }) => (
                  <SkinTile
                    skin={item}
                    onPress={() => {
                      dispatch(
                        addSkin({
                          ...item,
                          ...(item.weapon_type === "Knife" && {
                            gun_type: weaponType,
                          }),
                          ...(item.type === "Gloves" && {
                            weapon_type: "Gloves",
                            gun_type: weaponType,
                          }),
                          ...(item.type == null && {
                            weapon_type: "Agent",
                            gun_type: weaponType,
                          }),
                        })
                      );
                      navigation.goBack();
                    }}
                  />
                )}
              />
            )}
            keyExtractor={(item) => item.name}
          />
        ) : order === orderStates.PRICE ? (
          <FlatList
            data={orderByPrice(filteredSkins, orderAscending).filter((skin) =>
              skin.name.toLowerCase().includes(searchFilter.toLowerCase())
            )}
            renderItem={({ item }) => <SkinRowTile skin={item} />}
            keyExtractor={(item) => item.name}
          />
        ) : order === orderStates.SOLD ? (
          <FlatList
            data={orderByQuantitySold(filteredSkins, orderAscending).filter(
              (skin) =>
                skin.name.toLowerCase().includes(searchFilter.toLowerCase())
            )}
            renderItem={({ item }) => <SkinRowTile skin={item} />}
            keyExtractor={(item) => item.name}
          />
        ) : (
          <FlatList
            data={orderByRarity(filteredSkins, orderAscending).filter((skin) =>
              skin.name.toLowerCase().includes(searchFilter.toLowerCase())
            )}
            renderItem={({ item }) => <SkinRowTile skin={item} />}
            keyExtractor={(item) => item.name}
          />
        )
      ) : (
        <Loading transparent={true} />
      )}
    </View>
  );
}
