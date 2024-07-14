import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Button,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { getData } from "../../../api/api";
import { useFocusEffect } from "@react-navigation/native";
import ComLoading from "../../../Components/ComLoading/ComLoading";
import { useStorage } from "../../../hooks/useLocalStorage";
import ComProduct from "../../Home/Product/ComProduct";
import sort1 from "../../../../assets/iconSort/Sort1.png";
import sort2 from "../../../../assets/iconSort/Sort2.png";
import sort3 from "../../../../assets/iconSort/Sort3.png";

import { Picker } from "@react-native-picker/picker";
export default function Product3() {
  const [data, setData] = useState([]);
  const [dataOld, setdataOld] = useState([]);
  const [sortOrder, setSortOrder, loadSortOrder] = useStorage("sort", "0");
  const [like, setLike, loadStoredValue] = useStorage("like", []);
  const [selectedColor, setSelectedColor] = useState(""); // State for selected color

  const changeData = () => {

    const sortedData = [...data]?.sort((a, b) => {
      if (sortOrder === "1") {
           
        return a.MinutesPlayed - b.MinutesPlayed;
      }
      if (sortOrder === "2") {
        return b.MinutesPlayed - a.MinutesPlayed;
      }
    });
    if (sortOrder === "0") {
      return setData(dataOld);
    }
    setData(sortedData);
     console.log(sortedData);
  };

  useEffect(() => {
    changeData();
  }, [sortOrder]);

  const handleLike = (value) => {
    setLike([...like, value]);
    return;
  };
  const handleUnlike = (value) => {
    setLike(like.filter((item) => item.id !== value.id));
    return;
  };

  const handleSort = () => {
    if (sortOrder === "1") {
      return setSortOrder("2");
    }
    if (sortOrder === "2") {
      return setSortOrder("0");
    }
    if (sortOrder === "0") {
      return setSortOrder("1");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadStoredValue();
      return () => {};
    }, [loadStoredValue])
  );

  useEffect(() => {
    getData("/lan").then((e) => {
      setData(e?.data.reverse());
      setdataOld(e?.data.reverse());
      setSortOrder("0");
    });
  }, []);

  const handleIcon = () => {
    if (sortOrder === "1") {
      return sort2;
    }
    if (sortOrder === "2") {
      return sort3;
    }
    return sort1;
  };

  const filterByColor = (color) => {
    if (color === "") {
      return data;
    }
    return data.filter((item) => item.minutesPlayed === color);
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
      <TouchableOpacity
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
        onPress={() => handleSort()}
      >
        <Text>Sắp xếp</Text>
        <Image
          source={handleIcon()}
          style={{
            width: 30,
            height: 30,
            padding: 10,
            margin: 10,
            objectFit: "fill",
          }}
        />
      </TouchableOpacity>


      <ComLoading show={false}>
        {data.map((items) =>
          items.isCaptain && 2024 - items.YoB > 34 ? (
            <ComProduct
              key={items.id}
              value={items}
              handleUnlike={handleUnlike}
              handleLike={handleLike}
            />
          ) : null
        )}
      </ComLoading>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 15,
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
  comCatalogue: {
    flexDirection: "row",
    gap: 30,
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    flexWrap: "wrap",
    marginBottom: 10,
  },
});
