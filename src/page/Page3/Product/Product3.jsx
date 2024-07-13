import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { getData } from "../../../api/api";
import { useFocusEffect } from "@react-navigation/native";
import ComLoading from "../../../Components/ComLoading/ComLoading";
import { useStorage } from "../../../hooks/useLocalStorage";
import ComProduct from "../../Home/Product/ComProduct";
import sort1 from "../../../../assets/iconSort/Sort1.png";
import sort2 from "../../../../assets/iconSort/Sort2.png";
import sort3 from "../../../../assets/iconSort/Sort3.png";

export default function Product3() {
  const [data, setData] = useState([]);
  const [dataOld, setdataOld] = useState([]);
  const [sortOrder, setSortOrder, loadSortOrder] = useStorage("sort", "0"); // Trạng thái để lưu thứ tự sắp xếp
  const [like, setLike, loadStoredValue] = useStorage("like", []);

  console.log(22222222, sortOrder);
  const changeData = () => {
    const sortedData = [...data]?.sort((a, b) => {
      console.log(111111111, sortOrder);
      if (sortOrder === "1") {
        // thay đổi theo đề bài
        return a.price - b.price;
      }
      if (sortOrder === "2") {
        return b.price - a.price;
      }
      
    });
    if (sortOrder === "0") {
      return setData(dataOld);
    }
    setData(sortedData);
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
      setdataOld(e?.data);
      setSortOrder("0")
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
  return (
    <View style={styles?.body}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      ></ScrollView>
      {/* <Button title={`Sắp xếp  ${sortOrder}`} onPress={() => handleSort()} /> */}

      <TouchableOpacity
        style={{ alignItems: "center" ,flexDirection:'row',justifyContent:"flex-end"}}
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
        {data.map(
          (items, index) =>
            // sửa lại theo đề bài muốn hiển thị ra cái gì
            items.isTopOfTheWeek ? (
              <ComProduct
                key={items.id}
                value={items}
                handleUnlike={handleUnlike}
                handleLike={handleLike}
              ></ComProduct>
            ) : (
              ""
            )

          // trong trường hợp không có nói chỉ hiện 1 thứ gì đó mà là hiện cả thì
          // <ComProduct
          //   key={items.id }
          //   value={items}
          //   handleUnlike={handleUnlike}
          //   handleLike={handleLike}
          // ></ComProduct>
        )}
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
