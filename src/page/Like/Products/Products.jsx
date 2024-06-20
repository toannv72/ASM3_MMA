import React, { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComSelectButton from "../../../Components/ComButton/ComSelectButton";
import ComProduct from "./ComProduct";
import { getData } from "../../../api/api";
import { useFocusEffect } from "@react-navigation/native";
import ComLoading from "../../../Components/ComLoading/ComLoading";
import { useStorage } from "../../../hooks/useLocalStorage";

export default function Products({ deletes, call }) {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(true);
  const {
    text: { Home },
  } = useContext(LanguageContext);
  const [like, setLike, loadStoredValue] = useStorage("like", []);
  console.log(like);
  useFocusEffect(
    useCallback(() => {
      loadStoredValue();
      getData("/data").then((e) => {
        setShow(false);
        setData(e.data);
      });
      return () => {};
    }, [])
  );
  const handleLike = (value) => {
    setLike([...like, value]);
    return;
  };
  const handleUnlike = (value) => {
    setLike(like.filter((item) => item.id !== value.id));
    call();
    return;
  };

  useEffect(() => {
    loadStoredValue();
  }, [deletes]);
  return (
    <View style={styles?.body}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      ></ScrollView>
      <ComLoading show={show}>
        {like.map((value, index) => (
          <View key={value?.id}>
            <ComProduct
              id={value?.id}
             
              value={value}
            
              name={value.perfumeName}
              handleUnlike={handleUnlike}
              handleLike={handleLike}
            >
              {value.perfumeDescription}
            </ComProduct>
          </View>
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
    marginLeft: 16,
    marginBottom: 10,
  },
});
