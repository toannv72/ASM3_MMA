
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Add() {
  return (
    <View>
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
              <Button
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
              <Button
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
              </Button>

              <Button
                onPress={toggleDialog}
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
          </View>
        </View>
      </Dialog>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 300,
    height: 300,
    objectFit: "cover",
    position: "relative",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 5,
  },
});