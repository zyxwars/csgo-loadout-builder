import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";

export default function Test() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await axios
      .get("http://csgobackpack.net/api/GetItemsList/v2/?currency=eur")
      .catch((err) => {
        console.log(err);
      });

    console.log(
      res.data["items_list"]["AK-47 | Aquamarine Revenge (Battle-Scarred)"]
    );

    setData(res.data["items_list"]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
}
