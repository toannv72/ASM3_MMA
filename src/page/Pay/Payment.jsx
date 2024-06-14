import { useRoute } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postData } from "../../api/api";
import ComHeader from "../../Components/ComHeader/ComHeader";
const Payment = () => {
  const [error, setError] = useState("");
  const route = useRoute();
  const { itemData, quantity } = route.params;
  const [userData, setUserData] = useState({});
  const [storedData, setStoredData] = useState([]);
  const [products, setProducts] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
    },
  });
  const loadStoredData = async () => {
    try {
      const dataAsyncStorage = await AsyncStorage.getItem("like");
      if (dataAsyncStorage !== null) {
        const storedData = JSON.parse(dataAsyncStorage);
        setStoredData(storedData);
      } else {
        setStoredData([]);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  const navigation = useNavigation();
  const groupAndSumQuantities = () => {
    const groupedProducts = itemData.reduce((acc, product) => {
      if (!acc[product._id]) {
        acc[product._id] = { ...product }; // Clone sản phẩm để tránh ảnh hưởng đến dữ liệu gốc
      } else {
        acc[product._id].quantitys += product.quantitys; // Tăng số lượng
      }
      return acc;
    }, {});

    const uniqueProducts = Object.values(groupedProducts);

    // Lưu ý: Đây chỉ là cách cập nhật trực tiếp các sản phẩm trong state, bạn có thể cần sử dụng setProducts() để cập nhật state trong ứng dụng thực tế
    setProducts(uniqueProducts);
  };

  const handleDeleteSelectedItems = () => {
    // Lọc các mục chưa được chọn và cập nhật storedData
    const updatedStoredData = storedData.filter(
      (data) =>
        !itemData.some((item) => JSON.stringify(item) === JSON.stringify(data))
    );
    console.log("====================================");
    console.log(updatedStoredData);
    console.log(storedData);
    console.log(itemData);
    console.log("====================================");
    AsyncStorage.setItem("like", JSON.stringify(updatedStoredData));
  };

  const getStoredUserId = async () => {
    try {
      const data = await AsyncStorage.getItem("@user");
      if (data !== null) {
        const userData = JSON.parse(data);
        setUserData(userData);
      } else {
        console.log("No data found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    // Gọi hàm getStoredUserId khi component được tạo ra
    getStoredUserId();
    loadStoredData();
    groupAndSumQuantities();
    // Thêm listener cho sự kiện 'focus'
    const unsubscribe = navigation.addListener("focus", () => {
      // Tải lại dữ liệu khi trang hồ sơ được focus
      getStoredUserId();
    });
    // Hủy đăng ký listener khi component unmount
    return unsubscribe;
  }, [navigation]);
console.log(111111111111,userData._id);
  const onSubmit = (data) => {
    const ProductPost = products.map((e, index) => {
      return { ...e, product: e._id, price: e.price, quantity: e?.quantitys };
    });

    const dataPost = {
      ...data,
      userID: userData._id,
      amount: totalAmount,
      shippingAddress: data.shippingAddress,
      description: " ",
      email: data.email,
      products: ProductPost,
      totalAmount: totalAmount,
    };
    postData("/api/order/user", { ...dataPost, payment: "Cash" })
      .then((data) => {
        navigation.navigate("Bill2", { itemData: data._id });
        handleDeleteSelectedItems();
      })
      .catch((error) => {
          setError(error.response?.data?.error);
          console.log(error);
      });
  };

  function formatCurrency(number) {
    // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "VND",
    });
  }
  const totalAmount =
    products?.reduce((total, data) => {
      const itemTotal = data.price * data?.quantitys;
      return total + itemTotal;
    }, 0) || 0;
  return (
    <View style={styles.container}>
      <ComHeader showTitle title="Thanh toán" showBackIcon />
      <ScrollView>
        <View style={{ padding: 20, width: 400 }}>
          {/* <View
                key={index}
                style={{ flexDirection: "row", gap: 5 }}
              >
                <View>
                  <Image source={{ uri: data.image[0] }} style={styles.image} />
                </View>
                <View>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {data.name}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {formatCurrency(data.price)} x {data?.quantitys}
                  </Text>
                </View>
              </View> */}
          {products?.map((data, index) => (
            <TouchableOpacity
              style={styles.body}
              key={index}
              onPress={() => {
                navigation.navigate("HealthMonitorDetail", { id: data.id });
              }}
            >
              <Image
                source={{ uri: data.image[0] }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  objectFit: "cover",
                  borderWidth: 0.5,
                  borderColor: "#000",
                }}
              />
              <View style={styles?.container1}>
                <View style={styles?.container}>
                  <Text style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                      Tên sản phẩm
                    </Text>
                    <Text>: {data?.name}</Text>
                    {/* <Text>: {data?.name}</Text> */}
                  </Text>
                </View>

                <View style={styles?.container}>
                  <Text style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                      Giá tiền
                    </Text>
                    <Text>
                      : {formatCurrency(data.price)} x {data?.quantitys}
                    </Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <View style={{ flexDirection: "row", padding: 5, gap: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Tổng tiền</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {formatCurrency(totalAmount)}
            </Text>
          </View>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
        <View style={{ padding: 20, width: 400 }}>
          <Text>Tên:</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
            defaultValue="ssss"
            rules={{ required: true }}
          />
          {errors.name && (
            <Text style={{ color: "red" }}>Vui lòng nhập tên của bạn</Text>
          )}
          <Text>Địa chỉ giao hàng:</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="shippingAddress"
          />
          {errors.shippingAddress && (
            <Text style={{ color: "red" }}>
              Vui lòng nhập địa chỉ giao hàng
            </Text>
          )}
          <Text>Email:</Text>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            rules={{ required: true, pattern: /^\S+@\S+$/i }}
            name="email"
          />
          {errors.email && errors.email.type === "required" && (
            <Text style={{ color: "red" }}>Vui lòng nhập email</Text>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <Text style={{ color: "red" }}>Email không hợp lệ</Text>
          )}

          <Text>Số điện thoại:</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="phone"
            defaultValue=""
            rules={{
              required: true,
              pattern: /^0[0-9]{9,10}$/,
              minLength: 10,
              maxLength: 10,
            }}
          />
          {errors.phone && errors.phone.type === "required" && (
            <Text style={{ color: "red" }}>Vui lòng nhập số điện thoại</Text>
          )}
          {errors.phone && errors.phone.type === "pattern" && (
            <Text style={{ color: "red" }}>Số điện thoại không hợp lệ</Text>
          )}
          {errors.phone?.type === "minLength" && (
            <Text style={{ color: "red" }}>Số điện thoại không hợp lệ</Text>
          )}
          {errors.phone?.type === "maxLength" && (
            <Text style={{ color: "red" }}>Số điện thoại không hợp lệ </Text>
          )}
          {/* <Button title="Đặt hàng"  /> */}
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: 80,
        }}
      >
        <View style={{ width: "100%" }}>
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
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
                Đặt hàng
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 50,
    height: 50,
  },

  container1: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  text: {
    flex: 1,
  },
  body: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
    backgroundColor: "#fff",

    elevation: 4, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default Payment;
