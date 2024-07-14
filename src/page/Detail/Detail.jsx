import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from "@react-navigation/native";
import { useStorage } from "../../hooks/useLocalStorage";
import editIcon from "../../../assets/iconLike/Favorite_fill.png";
import editIcon1 from "../../../assets/iconLike/Favorite.png";
import ComLoading from "../../Components/ComLoading/ComLoading";
import StarRating from "react-native-star-rating-widget";

export default function Detail() {
  const route = useRoute();
  // data được truyền  
  const { id } = route.params;
  const [data, setData] = useState(id);
  const [show, setShow] = useState(true);
  const [check, setCheck] = useState(null);
  const [like, setLike, loadStoredValue] = useStorage("like", []);
  const navigation = useNavigation();
  const hasId = (id, array) => array.some((item) => item.id === id);
  const handleBackPress = () => {
    // nút quay lại 
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      // tải lại dữ liệu những sản phẩm đã like 
      loadStoredValue();

      setData(id);
      // kiểm tra xem sản phẩm đã được like hay chưa 
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
              //  thay đổi đường dẫn ảnh theo hợp lý data?.image =>data?.????
              source={{ uri: data?.image }}
              style={{
                height: 300,
                objectFit: "fill",
                width: "100%",
                borderRadius: 30,
              }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.row}>
            <Text style={{ ...styles.contentBold, flex: 9, fontWeight: "900" }}>
              {/*thay đổi tên sản phẩm */}
              {data?.playerName}
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
          {/*thay đổi tiền sản phẩm */}
          <View style={styles.row}>
            <Text style={styles.contentBold}>Yob</Text>
            <Text style={styles.text}>{2024-data?.YoB} years old</Text>
          </View>
          {/* thay đổi rank sp */}
          {/* <View style={styles.row}>
            <Text style={styles.contentBold}>Rating</Text>
            <StarRating
              rating={parseFloat(data?.rating)}
              onChange={() => {}}
              starSize={20}
              maxStars={5}
              starStyle={styles.star}
              enableSwiping={false}
              enableHalfStar={true}
            />
          </View> */}
          <View style={styles.row}>
            {/* thay đổi */}
            <Text style={styles.contentBold}>Minutes Played</Text>
            <Text style={styles.text}> {data?.MinutesPlayed}</Text>
          </View>
          <View style={styles.row}>
            {/* thay đổi */}
            <Text style={styles.contentBold}>Captain</Text>
            <Text style={styles.text}>{data?.isCaptain ? "Yes" : "No"}</Text>
          </View>
          <View style={styles.row}>
            {/* thay đổi */}
            <Text style={styles.contentBold}>team</Text>
            <Text style={styles.text}> {data?.team}</Text>
          </View>
          <View style={styles.row}>
            {/* thay đổi */}
            <Text style={styles.contentBold}>Passing Accuracy</Text>
            <Text style={styles.text}> {data?.PassingAccuracy * 100}%</Text>
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
