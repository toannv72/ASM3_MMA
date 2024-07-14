import React, { useCallback, useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import editIcon from "../../../../assets/iconLike/Favorite_fill.png";
import editIcon1 from "../../../../assets/iconLike/Favorite.png";
import { useStorage } from "../../../hooks/useLocalStorage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import StarRating from "react-native-star-rating-widget";

export default function ComProduct({ value, handleLike, handleUnlike }) {
  const [check, setCheck] = useState(null);
  const [like, setLike, loadStoredValue] = useStorage("like", []);
  const hasId = (id, array) => array.some((item) => item.id === id);
  const navigation = useNavigation();

  const S = hasId(value.id, like);
  useFocusEffect(
    useCallback(() => {
      loadStoredValue();
      return () => {};
    }, [])
  );
  useEffect(() => {
    setCheck(S);
  }, [like]);
  // Tiền Việt
  const formatCurrency = (number) => {
    return number?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  // tiền Đô
  const formatCurrencyUSD = (number) => {
    return number?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  const Like = (id) => {
    setCheck(true);
    handleLike(id);
    return;
  };
  const Unlike = (id) => {
    setCheck(false);
    handleUnlike(id);
    return;
  };
  return (
    <TouchableOpacity
      // đường dẫn chuyển đến Details và chuyền value qua
      onPress={() => navigation.navigate("Details", { id: value })}
      style={styles?.body}
    >
      <Image
        //  thay đổi đường dẫn ảnh theo hợp lý
        source={{ uri: value?.image }}
        style={{
          width: 126,
          height: 133,
          //   borderRadius: 10,
          objectFit: "fill",
          borderWidth: 0.5,
          borderColor: "#000",
        }}
      />
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {/*thay đổi tên sản phẩm */}
          <Text style={styles.context} numberOfLines={2}>
            {value?.playerName}
            {"                                                           "}
          </Text>
          {/* nội dung sản phẩm */}
          <Text numberOfLines={1} style={styles.children}>
            Minutes Played: {value.MinutesPlayed}
          </Text>
          <Text numberOfLines={1} style={styles.children}>
            Yob: {2024 - value.YoB} years old
          </Text>

          {/* Rating  */}
          {/* <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              alignContent: "center",
            }}
          >
            <Text numberOfLines={1} style={styles.children}>
              Rank:
              <StarRating
                rating={parseFloat(value?.rating)}
                onChange={() => {}}
                starSize={15}
                maxStars={5}
                starStyle={styles.star}
                enableSwiping={false}
                enableHalfStar={true}
              />
            </Text>
          </View> */}
          <Text numberOfLines={1} style={styles.children}>
            Team: {value.team}
          </Text>
          {/* phần nối bật   */}
          <Text numberOfLines={1} style={{ color: "red" }}>
            {value.isCaptain ? "Captain" : ""}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignContent: "space-between",
              justifyContent: "space-between",
            }}
          >
            {/* giá tiền  thay đổi formatCurrency nếu là tiền việt*/}
            <Text numberOfLines={1} style={styles.children}>
              Passing Accuracy: {value.PassingAccuracy*100}%
            </Text>

            {/* giữ nguyên không thay đổi gì  */}
            {check ? (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => Unlike(value)}
              >
                <Image source={editIcon} style={styles.editIcon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => Like(value)}
              >
                <Image source={editIcon1} style={styles.editIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    flex: 1,
    gap: 20,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  context: {
    color: "#000",
    fontWeight: "900",
    fontSize: 18,
  },
  price: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 24,
  },
  children: {
    fontSize: 14,
  },
  editIcon: {
    width: 40,
    height: 40,
    // padding:5
  },
});
