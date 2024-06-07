import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

import ComHeader from "../../Components/ComHeader/ComHeader";
import Products from "./Products/Products";
import DeleteFilled from "../../../assets/iconLike/DeleteFilled.png";
import { useStorage } from "../../hooks/useLocalStorage";
export default function Like() {
  const [like, setLike, loadStoredValue] = useStorage("like", []);
  const [data, setData] = useState(true);
  const deletes = () => {
    setLike([]);
    setData(!data);
  };
  return (
    <>
      <ComHeader title={"Favorite List"} showTitle />
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity style={styles.editButton} onPress={() => deletes()}>
            <Image source={DeleteFilled} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles?.scrollView}
        >
          <Products deletes={data} />
          <View style={{ height: 120 }}></View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
});
