import React, { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import ComProduct from "./ComProduct";
import { getData } from "../../../api/api";
import { useFocusEffect } from "@react-navigation/native";
import ComLoading from "../../../Components/ComLoading/ComLoading";
import { useStorage } from "../../../hooks/useLocalStorage";

export default function Product() {
  const [data, setData] = useState([]);
  const [like, setLike, loadStoredValue] = useStorage("like", []);
  useFocusEffect(
    useCallback(() => {
      loadStoredValue();
      // thay đường dẫy api tương ứng nếu mà đổi data thẳng thif ko cần đổi
      getData("/lan").then((e) => {
        // để nguyên ko thay đổi
        setData(e.data);
      });
      return () => {};
    }, [])
  );
  // để nguyên ko thay đổi
  const handleLike = (value) => {
    setLike([...like, value]);
    return;
  };
  // để nguyên ko thay đổi
  const handleUnlike = (value) => {
    setLike(like.filter((item) => item.id !== value.id));
    return;
  };

  return (
    <View style={styles?.body}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      ></ScrollView>

      {/* để nguyên không sửa  */}
      {data?.map((items, index) => (
        <ComProduct
          key={items.id}
          value={items}
          handleUnlike={handleUnlike}
          handleLike={handleLike}
        ></ComProduct>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 15,
  },
  comCatalogue: {
    flexDirection: "row",
    gap: 30,
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    flexWrap: "wrap",
    // marginLeft: 16,
    marginBottom: 10,
  },
});
