import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../../assets/icon/backArrowWhite.png";
import { useNavigation } from "@react-navigation/native";
import { useStorage } from "../../../hooks/useLocalStorage";
import { getData } from "./../../../api/api";
import ComDateConverter from "./../../../Components/ComDateConverter/ComDateConverter";
import editIcon from "../../../../assets/iconLike/Favorite_fill.png";
import editIcon1 from "../../../../assets/iconLike/Favorite.png";

export default function ServiceHistoryDetail() {
  const [data, setData] = useState({});
  const [check, setCheck] = useState(null);
  const route = useRoute();
  const { id } = route.params;
  const [like, setLike, loadStoredValue] = useStorage("like", []);
  const navigation = useNavigation();
  const hasId = (id, array) => array.some((item) => item.id === id);

  const {
    text: { addingPackages },
    setLanguage,
  } = useContext(LanguageContext);
  const handleBackPress = () => {
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      loadStoredValue();
      return () => {};
    }, [])
  );
  useEffect(() => {
    setCheck(hasId(data.id, like));
  }, [data]);

  const formatCurrency = (number) => {
    return number?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  useFocusEffect(
    useCallback(() => {
      loadStoredValue();
      getData(`/data/${id}`).then((e) => {
        // setShow(false);

        setData(e.data);
      });
      return () => {};
    }, [])
  );
  // tiền Đô
  const formatCurrencyUSD = (number) => {
    return number?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  const Like = (value) => {
    setCheck(true);
    setLike([...like, value]);

    return;
  };
  const Unlike = (value) => {
    setCheck(false);
    setLike(like.filter((item) => item.id !== value.id));

    return;
  };
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backIconContainer}
        >
          <Image source={backArrowWhite} style={styles.backIcon} />
        </TouchableOpacity>
        <Image
          source={{ uri: data?.image }}
          style={{
            height: 200,
            objectFit: "fill",
          }}
        />
      </View>
      <ScrollView style={styles.body}>
        <Text
          style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}
          numberOfLines={2}
        >
          {data?.perfumeName}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ flex: 1, fontSize: 16, marginBottom: 10 }}>
            <Text style={{ fontWeight: "bold" }}>
              {formatCurrencyUSD(data?.price)}
            </Text>
          </Text>
          {check ? (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => Unlike(data)}
            >
              <Image source={editIcon} style={styles.editIcon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => Like(data)}
            >
              <Image source={editIcon1} style={styles.editIcon} />
            </TouchableOpacity>
          )}
        </View>

        <Text style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text style={styles.contentBold}>Dành cho</Text>
          <Text style={{ fontSize: 16 }}>: {data?.gender ? "nam" : "nữ"}</Text>
        </Text>
        <Text style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text style={styles.contentBold}>
            {addingPackages?.package?.category}
          </Text>
          <Text style={{ fontSize: 16 }}>: {data?.company}</Text>
        </Text>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.contentBold}>
            {addingPackages?.package?.description}
          </Text>
          <Text style={{ fontSize: 16 }}>{data?.perfumeDescription}</Text>
        </View>
        <View style={{ marginBottom: 40, gap: 10 }}>
          {data?.feedbacks?.map((data, index) => (
            <View key={index}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {data?.author}
                </Text>
                <ComDateConverter>{data?.date}</ComDateConverter>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {data?.rating} SAO
                </Text>
              </View>
              <Text>{data?.comment}</Text>
              <Text>---------------------------------------------------</Text>
            </View>
          ))}
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  header: {
    paddingTop: 50,
  },
  contentBold: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  backIconContainer: {
    position: "absolute",
    zIndex: 100,
    marginTop: 60,
    marginLeft: 10,
    padding: 3,
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backIcon: {
    width: 50,
    height: 50,
  },
});
