import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
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
import { Dialog } from "react-native-elements";
import Toast from "react-native-toast-message";
import ComButton from "./../../../Components/ComButton/ComButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ServiceHistoryDetail() {
  const [data, setData] = useState({});
  const [show, setShow] = useState(true);
  const [check, setCheck] = useState(null);
  const route = useRoute();
  const { id } = route.params;
  const [like, setLike, loadStoredValue] = useStorage("like", []);
  const navigation = useNavigation();
  const [visible1, setVisible1] = useState(false);
  const [quantity, setQuantity] = useState(1); // State để lưu số lượng sản phẩm được chọn
  const [quantity1, setQuantity1] = useState(1);
  const [visible, setVisible] = useState(false);
  const [checkQ, setQ] = useState(false);
  const [checkQ1, setQ1] = useState(false);
  const [checkQuantity1, setcheckQuantity1] = useState(false);
  const [checkQuantity, setcheckQuantity] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (quantity > data?.quantity) {
      setcheckQuantity(true);
    } else {
      setcheckQuantity(false);
    }
    if (quantity1 > data?.quantity) {
      setcheckQuantity1(true);
    } else {
      setcheckQuantity1(false);
    }
    if (quantity == null) {
      setQ(true);
    } else {
      setQ(false);
    }
    if (quantity1 == null) {
      setQ1(true);
    } else {
      setQ1(false);
    }
  }, [quantity, quantity1]);
  const hasId = (id, array) => array.some((item) => item._id === id);

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
    setCheck(hasId(data?._id, like));
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
      getData(`/api/product/${id}`).then((e) => {
        setShow(false);
        setData(e);
      });
      return () => {};
    }, [])
  );
  const toggleDialog1 = () => {
    setVisible1(!visible1);
  };

  const toggleDialog = () => {
    setVisible(!visible);
  };
  const pay = () => {
    navigation.navigate("Payment", {
      itemData: [{ ...data, quantitys: quantity1 }],
    });
  };
  const addToCart = () => {
    const newItem = { ...data, quantitys: quantity || 1 };
    const updatedCartItems = [...like, newItem];
    setCartItems(updatedCartItems);
    setLike(updatedCartItems); // Lưu thông tin vào AsyncStorage
    toggleDialog1();
    Toast.show({
      type: "success",
      text1: "Thành công",
      text2: "Đã thêm sản phẩm vào giỏ hàng.",
    });
  };

  return (
    <>
      <ComLoading show={show}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backIconContainer}
          >
            <Image source={backArrowWhite} style={styles.backIcon} />
          </TouchableOpacity>
          <Image
            source={{ uri: data?.image ? data?.image[0] : " " }}
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
            {data?.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1, fontSize: 16, marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold" }}>
                {formatCurrency(data?.price)}
              </Text>
            </Text>
          </View>

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
            <Text style={{ fontSize: 16 }}>{data?.description}</Text>
          </View>
          <View style={{ marginBottom: 40, gap: 10 }}></View>
          <View style={{ height: 100 }}></View>
        </ScrollView>
        {/* nút mua hàng và thêm vào giỏ hàng  */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            height: 80,
          }}
        >
          <View style={{ width: "50%" }}>
            <TouchableOpacity onPress={toggleDialog1} style={{ width: "100%" }}>
              <View
                style={{
                  backgroundColor: "#cd4a38",
                  height: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                >
                  Thêm vào giỏ hàng
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ width: "50%" }}>
            <TouchableOpacity onPress={toggleDialog}>
              <View
                style={{
                  backgroundColor: "blue",
                  height: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                >
                  Mua ngay
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ComLoading>

      <Dialog isVisible={visible1} onBackdropPress={toggleDialog1}>
        <Dialog.Title title="Nhập số lượng " />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Nhập số lượng:</Text>
            <TextInput
              value={quantity ? quantity.toString() : "0"} // Nếu quantity là null hoặc undefined thì hiển thị '0'
              onChangeText={(text) => {
                if (/^\d+$/.test(text)) {
                  // Kiểm tra xem text có phải là số không
                  setQuantity(parseInt(text));
                } else if (text === "") {
                  // Nếu text rỗng, gán giá trị cho quantity là null
                  setQuantity(null);
                }
              }}
              keyboardType="numeric"
              style={{ fontWeight: "bold", borderWidth: 1, padding: 3 }}
            />
            {checkQuantity && (
              <Text style={{ color: "red" }}>
                Vui lòng nhập nhỏ hơn {data?.quantity}
              </Text>
            )}
            {checkQ && (
              <Text style={{ color: "red" }}>Vui lòng nhập lớn hơn 0</Text>
            )}

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <ComButton
                onPress={() => {
                  toggleDialog1();
                  addToCart();
                }}
                disabled={checkQuantity || checkQ}
                style={{
                  backgroundColor: "red",
                  margin: 9,
                  borderRadius: 10,
                  color: "#000",
                }}
              >
                <Text style={{ color: "#fff" }}>Xác nhận</Text>
              </ComButton>
              <ComButton
                onPress={toggleDialog1}
                style={{
                  backgroundColor: "#057594",
                  margin: 9,
                  borderRadius: 10,
                  color: "#000",
                }}
              >
                <Text style={{ color: "#fff" }}>Hủy</Text>
              </ComButton>
            </View>
          </View>
        </View>
      </Dialog>

      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title="Nhập số lượng " />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Nhập số lượng:</Text>
            <TextInput
              value={quantity1 ? quantity1.toString() : "0"} // Nếu quantity là null hoặc undefined thì hiển thị '0'
              onChangeText={(text) => {
                if (/^\d+$/.test(text)) {
                  // Kiểm tra xem text có phải là số không
                  setQuantity1(parseInt(text));
                } else if (text === "") {
                  // Nếu text rỗng, gán giá trị cho quantity là null
                  setQuantity1(null);
                }
              }}
              keyboardType="numeric"
              style={{ fontWeight: "bold", borderWidth: 1, padding: 3 }}
            />
            {checkQuantity1 && (
              <Text style={{ color: "red" }}>
                Vui lòng nhập nhỏ hơn {data?.quantity}
              </Text>
            )}
            {checkQ1 && (
              <Text style={{ color: "red" }}>Vui lòng nhập lớn hơn 0</Text>
            )}

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <ComButton
                onPress={() => {
                  toggleDialog();
                  pay();
                }}
                style={{
                  backgroundColor: "red",
                  margin: 9,
                  borderRadius: 10,
                  color: "#000",
                }}
                disabled={checkQuantity1 || checkQ1}
              >
                <Text style={{ color: "#fff" }}>Xác nhận</Text>
              </ComButton>

              <ComButton
                onPress={toggleDialog}
                style={{
                  backgroundColor: "#057594",
                  margin: 9,
                  borderRadius: 10,
                  color: "#000",
                }}
              >
                <Text style={{ color: "#fff" }}>Hủy</Text>
              </ComButton>
            </View>
          </View>
        </View>
      </Dialog>
      <Toast />
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
