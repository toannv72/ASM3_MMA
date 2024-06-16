import React, { useState, useCallback } from "react";
import { StyleSheet, View, ScrollView, Image, Text } from "react-native";
import { CheckBox, Dialog } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useStorage } from "../../hooks/useLocalStorage";
import ComButton from "../../Components/ComButton/ComButton";
import ComHeader from "../../Components/ComHeader/ComHeader";
import gioHang from "../../../assets/gioHang.png";

export default function Favourite({ navigation }) {
  const [checkedList, setCheckedList] = useState([]);
  // const [storedData, setStoredData] = useState([]);
  const [ShowSelect, setShowSelect] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [storedData, setStoredData, loadStoredValue] = useStorage("like", []);

  const toggleDialog1 = () => {
    setVisible1(!visible1);
  };
  let pressTimer;
  const checkAll = storedData.length === checkedList.length;

  const onCheckboxPress = (value) => {
    const updatedCheckedList = [...checkedList];
    const index = updatedCheckedList.indexOf(value);

    if (index !== -1) {
      // Remove the item if it's already checked
      updatedCheckedList.splice(index, 1);
    } else {
      // Add the item if it's not checked
      updatedCheckedList.push(value);
    }

    setCheckedList(updatedCheckedList);
  };
  const onCheckAllPress = () => {
    setCheckedList(checkAll ? [] : storedData.map((data) => data));
  };

  useFocusEffect(
    useCallback(() => {
      setCheckedList([]);
      // loadStoredData().catch((error) =>
      //   console.error("Error loading data:", error)
      // );
      loadStoredValue();
      setShowSelect(false);
      return () => {};
    }, [])
  );

  const handlePressIn = () => {
    pressTimer = setTimeout(() => {
      setShowSelect(true);
      setPressed(true);
    }, 1000); // Thời gian giữ để được xem là long press (1000 miliseconds = 1 giây)
  };

  const handlePressOut = () => {
    clearTimeout(pressTimer);
    setPressed(false);
    // navigation.navigate("Detail", { itemData: data });
  };
  const handlePress = (data) => {
    if (!pressed) {
      // Chỉ chuyển trang nếu người dùng không nhấn giữ
      navigation.navigate("Details", { id: data });
    }
  };

  const handleDeleteSelectedItems = () => {
    // Lọc các mục chưa được chọn và cập nhật storedData
    const updatedStoredData = storedData.filter(
      (data) => !checkedList.includes(data)
    );
    setStoredData(updatedStoredData);
    // Đặt lại checkedList về mảng trống
    setCheckedList([]);
    setShowSelect(false);
    // Lưu trạng thái mới của storedData vào AsyncStorage
    AsyncStorage.setItem("like", JSON.stringify(updatedStoredData));
  };
  const pay = () => {
    navigation.navigate("Payment", { itemData: checkedList });
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
        {ShowSelect || (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
              backgroundColor: "#fff",
              padding: 10,
              margin: 10,
            }}
          >
            <Text style={{ fontSize: 20 }}>Giỏ Hàng</Text>
            {storedData.length != 0 ? (
              <Text
                style={{ fontSize: 20 }}
                onPress={() => setShowSelect(true)}
              >
                Chọn
              </Text>
            ) : (
              <></>
            )}
          </View>
        )}
        {!ShowSelect || (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <ComButton
              style={{
                backgroundColor: "#057594",
                margin: 9,
                borderRadius: 10,
                color: "#000",
              }}
              onPress={onCheckAllPress}
            >
              {!checkAll ? "Chọn hết" : "Bỏ chọn"}
            </ComButton>
            {checkedList.length !== 0 ? (
              <ComButton
                onPress={toggleDialog1}
                style={{
                  backgroundColor: "red",
                  borderRadius: 10,
                  margin: 9,
                  justifyContent: "space-between",
                  alignContent: "center",
                  color: "#000",
                }}
              >
                <Text style={{ color: "#fff", marginTop: 5 }}>Xóa </Text>
              </ComButton>
            ) : (
              <></>
            )}
            {checkedList.length !== 0 ? (
              <ComButton
                onPress={pay}
                style={{
                  backgroundColor: "#057594",
                  borderRadius: 10,
                  margin: 9,
                  justifyContent: "space-between",
                  alignContent: "center",
                  color: "#000",
                }}
              >
                <Text style={{ color: "#fff", marginTop: 5 }}>Mua </Text>
              </ComButton>
            ) : (
              <></>
            )}
            <ComButton
              onPress={() => setShowSelect(false)}
              style={{
                backgroundColor: "#057594",
                margin: 9,
                borderRadius: 10,
                color: "#000",
              }}
            >
              <Text style={{ color: "#fff", padding: 0 }}>Hủy</Text>
            </ComButton>
          </View>
        )}

        <ScrollView>
          {storedData.length == 0 ? (
            <View>
              <View>
                <Image
                  style={{ width: "100%", height: 400 }}
                  source={gioHang}
                />
                <Text
                  style={{
                    color: "#000",
                    fontSize: 20,
                    padding: 30,
                    textAlign: "center",
                  }}
                >
                  Danh sách yêu thích trống!
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
          <View
            style={{ flexDirection: "column-reverse", rowGap: 10, padding: 14 }}
          >
            {storedData.map((data, index) => (
              <View style={{ padding: 0, flexDirection: "row" }} key={index}>
                {!ShowSelect || (
                  <BouncyCheckbox
                    size={25}
                    fillColor="blue"
                    unFillColor="#FFFFFF"
                    text="Custom Checkbox"
                    iconStyle={{ borderColor: "blue" }}
                    innerIconStyle={{ borderWidth: 2 }}
                    isChecked={checkedList.includes(data)}
                    onPress={() => onCheckboxPress(data)}
                  />
                )}
                <TouchableOpacity
                  style={styles.origin}
                  key={data._id}
                  onPress={() => handlePress(data._id)}
                  onPressIn={() => handlePressIn()}
                  onPressOut={() => handlePressOut()}
                  activeOpacity={0.6}
                >
                  <Image
                    source={{ uri: data.image ? data.image[0] : " " }}
                    style={styles.image}
                  />
                  <View style={{ paddingLeft: 10 }}>
                    <Text
                      style={
                        ShowSelect
                          ? { ...styles.title }
                          : { ...styles.title, width: 250 }
                      }
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {data.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text
                          style={{ fontWeight: "bold" }}
                        >{`Giá : ${data.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}`}</Text>
                        <Text>{`Còn lại: ${data.quantity}`}</Text>
                        <Text>{`Đã chọn: ${data?.quantitys}`}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={{ height: 170 }}></View>
        </ScrollView>

        <Dialog isVisible={visible1} onBackdropPress={toggleDialog1}>
          <Dialog.Title title="Xác nhận xóa " />
          <Text>Bạn có chắc muốn xóa những sản phẩm đã chọn</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button
              onPress={() => {
                handleDeleteSelectedItems(), toggleDialog1();
              }}
              style={{
                backgroundColor: "red",
                margin: 9,
                borderRadius: 10,
                color: "#000",
              }}
            >
              <Text style={{ color: "#fff" }}>Xác nhận</Text>
            </Button>
            <Button
              onPress={toggleDialog1}
              style={{
                backgroundColor: "#057594",
                margin: 9,
                borderRadius: 10,
                color: "#000",
              }}
            >
              <Text style={{ color: "#fff" }}>Hủy</Text>
            </Button>
          </View>
        </Dialog>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    width: 180,
    marginVertical: 5,
  },
  origin: {
    flexDirection: "row",
    backgroundColor: "#fff",
    // borderRadius: 20,
    elevation: 10, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  checkbox: {
    backgroundColor: "#78b2a2", // Sử dụng màu nền mong muốn
  },
});
