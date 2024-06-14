import React, { useCallback, useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import editIcon from "../../../../assets/iconLike/Favorite_fill.png";
import editIcon1 from "../../../../assets/iconLike/Favorite.png";
import { useStorage } from "../../../hooks/useLocalStorage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function ComNew({
  url,
  children,
  value,
  name,
  handleLike,
  handleUnlike,
}) {
  const [check, setCheck] = useState(null);
  const [like, setLike, loadStoredValue] = useStorage("like", []);
  const hasId = (id, array) => array.some((item) => item._id === id);
  const navigation = useNavigation();

  const S = hasId(value._id, like);
  useFocusEffect(
    useCallback(() => {
      loadStoredValue();
      return () => {};
    }, [])
  );
  useEffect(() => {
    setCheck(S);
  }, [like]);
  // Tiền Việt
  const formatCurrency = (number) => {
    return number?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { id: value._id })}
      style={styles?.body}
    >
      <Image
        source={{ uri: url }}
        style={{
          width: 126,
          height: 133,
          //   borderRadius: 10,
          objectFit: "fill",
          borderWidth: 0.5,
          borderColor: "#000",
        }}
      />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {/* tên sản phẩm */}
          <Text style={styles.context} numberOfLines={2}>
            {name}
          </Text>
          {/* nội dung sản phẩm */}
          <Text numberOfLines={4} style={styles.children}>
            {children}
          </Text>
          {/* giá tiền */}
          <View
            style={{
              flexDirection: "row",
              alignContent: "space-between",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.price}>{formatCurrency(value?.price)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    flex: 1,
    gap: 20,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  context: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  price: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 24,
  },
  children: {
    fontSize: 14,
  },
  editIcon: {
    width: 40,
    height: 40,
    // padding:5
  },
});
