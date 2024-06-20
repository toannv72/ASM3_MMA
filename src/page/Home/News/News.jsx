import React, { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import TopicContent from "../TopicContent";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComSelectButton from "../../../Components/ComButton/ComSelectButton";
import ComNew from "./ComNew";
import { getData } from "./../../../api/api";
import { useFocusEffect } from "@react-navigation/native";
import ComLoading from "../../../Components/ComLoading/ComLoading";
import { useStorage } from "../../../hooks/useLocalStorage";

export default function News() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(true);
  const {
    text: { Home },
  } = useContext(LanguageContext);
  const [like, setLike, loadStoredValue] = useStorage("like", []);

  const [select, setSelect] = useState(true);
  const [select1, setSelect1] = useState(false);
  const check = () => {
    setSelect(true);
    setSelect1(false);
  };
  const check1 = () => {
    setSelect(false);
    setSelect1(true);
  };

  useFocusEffect(
    useCallback(() => {
      loadStoredValue();
      getData("/lan").then((e) => {
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
    return;
  };

  return (
    <View style={styles?.body}>
      <TopicContent>Các loài hoa</TopicContent>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      ></ScrollView>
      <ComLoading show={show}>
        {data.map((value, index) => (
          <View key={index}>
            {/* <ComSelectButton onPress={check1} check={select1}>
              {value.name}
            </ComSelectButton> */}
            <View style={styles?.buttonContainer}>
              <ComSelectButton check={select1}>{value.name}</ComSelectButton>
            </View>
            {value.items.map((items, index) => (
              <ComNew
                key={index}
                value={items}
                handleUnlike={handleUnlike}
                handleLike={handleLike}
              ></ComNew>
            ))}
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
    // marginLeft: 16,
    marginBottom: 10,
  },
});
