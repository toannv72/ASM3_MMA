import React, { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, Button } from "react-native";
import { View } from "react-native";
import { getData } from "../../../api/api";
import { useFocusEffect } from "@react-navigation/native";
import ComLoading from "../../../Components/ComLoading/ComLoading";
import { useStorage } from "../../../hooks/useLocalStorage";
import ComProduct from "./../../Home/Product/ComProduct";

export default function Product() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(true);
  const [sortOrder, setSortOrder, loadSortOrder] = useStorage("sort", "0"); // Trạng thái để lưu thứ tự sắp xếp
  const [like, setLike, loadStoredValue] = useStorage("like", []);

  console.log(22222222, sortOrder);
  const changeData = () => {
    const sortedData = [...data]?.sort((a, b) => {
      console.log(111111111, sortOrder);
      if (sortOrder === "1") {
        return a.price - b.price;
      }
      if (sortOrder === "2") {
        return b.price - a.price;
      }
    
    });
    setData(sortedData);
  };

  useEffect(() => {
    setTimeout(() => {
      changeData();
    }, 100);
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
       return setSortOrder("1");
     }
     if (sortOrder === "0") {
       return setSortOrder("1");
     }
  };
  useFocusEffect(
    useCallback(() => {
      // setData([]);
      loadStoredValue();
      // getData("/lan").then((e) => {
      //   setData(e?.data);
      //   setTimeout(() => {
      //     changeData();
      //   }, 100);
      // });
      return () => {};
    }, [])
  );
  useEffect(() => {
   getData("/lan").then((e) => {
     setData(e?.data);
   
   });
  }, []);

  return (
    <View style={styles?.body}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      ></ScrollView>
      <Button title={`Sắp xếp  ${sortOrder}`} onPress={() => handleSort()} />
      <ComLoading show={false}>
        {data.map((items, index) => (
         items.isTopOfTheWeek ? <ComProduct
            key={items.id}
            value={items}
            handleUnlike={handleUnlike}
            handleLike={handleLike}
          ></ComProduct>:""
        ))}
      </ComLoading>
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
