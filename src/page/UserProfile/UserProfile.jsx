import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import HeaderUser from "./HeaderUser";
import MenuList from "./MenuList";
import bill from "../../../assets/profile_icons/bill.png";
import changeLanguage from "../../../assets/profile_icons/changeLanguage.png";
import changePassword from "../../../assets/profile_icons/changePassword.png";
import contract from "../../../assets/profile_icons/contract.png";
import edit from "../../../assets/profile_icons/edit.png";
import feedback from "../../../assets/profile_icons/feedback.png";
import notification from "../../../assets/profile_icons/notification.png";
import serviceHistory from "../../../assets/profile_icons/serviceHistory.png";
import signout from "../../../assets/profile_icons/signout.png";
import { useNavigation } from "@react-navigation/native";
import { getData } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { number } from "yup";
export default function UserProfile({}) {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [pending, setpending] = useState({});
  const [processing, setprocessing] = useState({});
  const [shipped, setshipped] = useState({});
  const [Delivered, setDelivered] = useState({});
  useEffect(() => {
    // Gọi hàm getStoredUserId khi component được tạo ra
    getStoredUserId();

    // Thêm listener cho sự kiện 'focus'
    const unsubscribe = navigation.addListener("focus", () => {
      // Tải lại dữ liệu khi trang hồ sơ được focus
      getStoredUserId();
    });

    // Hủy đăng ký listener khi component unmount
    return unsubscribe;
  }, [navigation]);

  const getStoredUserId = async () => {
    try {
      const data = await AsyncStorage.getItem("@user");
      if (data !== null) {
        const userData = JSON.parse(data);
        setUserData(userData);

        getData(`/api/order/user/pending/${userData._id}`)
          .then((data) => {
            setpending(data);
          })
          .catch((error) => {
            console.log(error);
          });

        getData(`/api/order/user/processing/${userData._id}`)
          .then((data) => {
            setprocessing(data);
          })
          .catch((error) => {
            console.log(error);
          });

        getData(`/api/order/user/shipped/${userData._id}`)
          .then((data) => {
            setshipped(data);
          })
          .catch((error) => {
            console.log(error);
          });

        getData(`/api/order/user/Delivered/${userData._id}`)
          .then((data) => {
            setDelivered(data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("No data found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  const data = [
    {
      name: "don hang",
      number: pending.length,
      link: "ServiceHistory",
      icon: contract,
      status: "pending",
    },
    {
      name: "dang giao",
      link: "ServiceHistory",
      number: processing.length,
      icon: bill,
      status: "processing",
    },
    {
      name: "Lịch sử dịch vụ",
      number: shipped.length,
      link: "ServiceHistory",
      icon: serviceHistory,
      status: "shipped",
    },
    {
      name: "Lịch sử dịch vụ",
      number: Delivered.length,
      link: "ServiceHistory",
      icon: serviceHistory,
      status: "delivered",
    },
  ];

  const data3 = [
    {
      name: "Đăng xuất",
      link: "Login",
      icon: signout,
    },
  ];
  return (
    <View style={styles.body}>
      <HeaderUser userData={userData} />
      <MenuList data={data} />
   
      <MenuList data={data3} colorRed={true} />
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    gap: 10,
  },
  imageBody: {
    padding: 1,
    borderRadius: 10,
    borderWidth: 0.5,
    overflow: "hidden", // Ẩn phần ảnh nằm ngoài
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "180%",
    height: "180%",
    resizeMode: "cover",
    bottom: -50,
  },
});
