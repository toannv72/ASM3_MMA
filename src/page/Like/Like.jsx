import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import gioHang from "../../../assets/gioHang.png";
import ComHeader from "../../Components/ComHeader/ComHeader";
import Products from "./Products/Products";
import DeleteFilled from "../../../assets/iconLike/DeleteFilled.png";
import { useStorage } from "../../hooks/useLocalStorage";
import { useModalState } from "../../hooks/useModalState";
import ComPopup from "../../Components/ComPopup/ComPopup";
import { useFocusEffect } from "@react-navigation/native";
export default function Like() {
  const [like, setLike, loadStoredValue] = useStorage("like", []);
  const [data, setData] = useState(true);
  const modal = useModalState();

  const deletes = () => {
    setLike([]);
    setData(!data);
  };
  useFocusEffect(
    useCallback(() => {
      loadStoredValue();
      return () => {};
    }, [])
  );
  const call = () => {
    loadStoredValue();
  };
  return (
    <>
      <ComHeader title={"Favorite List"} showTitle />
      <ComPopup
        visible={modal.isModalOpen}
        title="Bạn muốn xóa hết?"
        buttons={[
          { text: "Hủy", onPress: modal.handleClose, check: true },
          {
            text: "Xác nhận",
            onPress: () => {
              deletes();
              modal.handleClose();
            },
          },
        ]}
        onClose={modal.handleClose}
      ></ComPopup>
      <View style={styles.container}>
        {like.length === 0 ? (
          <></>
        ) : (
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => modal.handleOpen()}
            >
              <Image source={DeleteFilled} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        )}
        {like.length ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles?.scrollView}
          >
            <Products deletes={data} call={call} />
            <View style={{ height: 120 }}></View>
          </ScrollView>
        ) : (
          <>
            <Image
              source={gioHang}
              style={{
                width: 400,
                height: 300,
                marginVertical:50,
                objectFit: "fill",
              }}
            />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
});
