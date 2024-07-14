import React, { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import ComProduct from "./ComProduct";
import { getData } from "../../../api/api";
import { useFocusEffect } from "@react-navigation/native";
import ComLoading from "../../../Components/ComLoading/ComLoading";
import { useStorage } from "../../../hooks/useLocalStorage";
import { Picker } from "@react-native-picker/picker";
export default function Product() {
  const [data, setData] = useState([]);
  const [like, setLike, loadStoredValue] = useStorage("like", []);
  const [selectedColor, setSelectedColor] = useState(""); // State for selected color
  const [dataOld, setdataOld] = useState([]);
  useFocusEffect(
    useCallback(() => {
      loadStoredValue();
      // thay đường dẫy api tương ứng nếu mà đổi data thẳng thif ko cần đổi
      getData("/lan").then((e) => {
        // để nguyên ko thay đổi
        setSelectedColor("")
        setData(e.data.reverse());
        setdataOld(e.data.reverse());
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

  const filterByColor = (color) => {
    const dataFilter = dataOld;
    if (color === "") {
      return dataOld;
    } else {
      
    }
    return dataFilter.filter((item) => item.team === color);
  };

  useEffect(() => {
    setData(filterByColor(selectedColor));
  }, [selectedColor]);

  return (
    <View style={styles?.body}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      ></ScrollView>
      <View style={[styles.input]}>
        <Picker
          selectedValue={selectedColor}
          pickerStyleType={{
            height: 50,
            width: 150,
            borderWidth: 0.5,
            borderColor: "#000",
          }}
          onValueChange={(itemValue) => setSelectedColor(itemValue)}
        >
          <Picker.Item label="All" value="" />
          <Picker.Item label="England" value="England" />
          <Picker.Item label="Serbia" value="Serbia" />
          <Picker.Item label="France" value="France" />
          <Picker.Item label="Spain" value="Spain" />
          <Picker.Item label="Italia" value="Italia" />
          <Picker.Item label="Croatia" value="Croatia" />
          <Picker.Item label="Portugal" value="Portugal" />
          <Picker.Item label="Belgium" value="Belgium" />
          <Picker.Item label="Austria" value="Austria" />
          <Picker.Item label="Netherlands" value="Netherlands" />
          {/* Add more colors as needed */}
        </Picker>
      </View>

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
  input: {
    backgroundColor: "#fff",
    height: 50,
    // padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
    justifyContent: "center",
    elevation: 5, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
