import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";

export default function ComServiceHistoryPackage({ data }) {
  const {
    text: { addingPackages },
    setLanguage,
  } = useContext(LanguageContext);

  const navigation = useNavigation();

  const formatCurrency = (number) => {
    // Sử dụng hàm toLocaleString() để định dạng số
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <TouchableOpacity
      style={styles.body}
      onPress={() => {
        navigation.navigate("Bill2", { itemData: data._id });
      }}
    >
      <Image
        source={{ uri: data?.img }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          objectFit: "fill",
        }}
      />
      <View style={styles?.container}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{data?.name}</Text>
        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            Tên người mua
          </Text>
          <Text>: {data?.name}</Text>
        </Text>
        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            Tổng tiền đơn hàng
          </Text>
          <Text>: {data?.totalAmount}</Text>
        </Text>

        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {addingPackages?.history?.status}
          </Text>
          <Text>: {data?.status}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
