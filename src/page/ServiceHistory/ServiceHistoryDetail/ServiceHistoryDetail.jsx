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
import ComLoading from "../../../Components/ComLoading/ComLoading";
import StarRating from "react-native-star-rating-widget";

export default function ServiceHistoryDetail() {
  const route = useRoute();
  const { id } = route.params;
  const [data, setData] = useState(id);
  const [show, setShow] = useState(true);
  const [check, setCheck] = useState(null);
  const [like, setLike, loadStoredValue] = useStorage("like", []);
  const navigation = useNavigation();
  const hasId = (id, array) => array.some((item) => item.id === id);
  const handleBackPress = () => {
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      loadStoredValue();
      setData(id);
      setCheck(hasId(data.id, like));

      setShow(false);
      return () => {};
    }, [])
  );
  useEffect(() => {
    setCheck(hasId(id.id, like));
  }, [id, like]);

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
      <ComLoading show={show}>
        <ScrollView style={styles.body}>
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
                height: 300,
                objectFit: "fill",
                width: "100%",
                borderRadius:30
              }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.row}>
            <Text style={{ ...styles.contentBold, flex: 9, fontWeight: "900" }}>
              {data?.name}
            </Text>
            <Text style={{ ...styles.text, flex: 1 }}>
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
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.contentBold}>Price</Text>
            <Text style={styles.text}> {formatCurrencyUSD(data?.price)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.contentBold}>Rating</Text>
            <StarRating
              rating={parseFloat(data?.rating)}
              onChange={() => {}}
              starSize={20}
              starStyle={styles.star}
              enableSwiping={false}
              enableHalfStar={true}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.contentBold}>Weight</Text>
            <Text style={styles.text}> {data?.weight}g</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.contentBold}>Top Of The Week</Text>
            <Text style={styles.text}>
              {data?.isTopOfTheWeek ? "Yes" : "No"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.contentBold}>Origin</Text>
            <Text style={styles.text}> {data?.origin}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.contentBold}>Bonus</Text>
            <Text style={styles.text}> {data?.bonus}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.contentBold}>Color</Text>
            <Text style={styles.text}> {data?.color}</Text>
          </View>
          <View style={{ height: 120 }}></View>
        </ScrollView>
      </ComLoading>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // paddingTop: 20,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
  },
  header: {
    paddingTop: 50,
  },
  contentBold: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  text: {
    fontSize: 18,
    color: "#666",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5,
    marginHorizontal:2,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flex: 1,
  },
  star: {
    marginHorizontal: 2,
    color: "#FFD700",
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
