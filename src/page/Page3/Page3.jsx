import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import Header from "./Header";
import Product from "./Product/Product3";
import TopPlacesCarousel from "../../Components/ComImg/TopPlacesCarousel";
import { TOP_PLACES } from "../../../db";
import ComHeader from "../../Components/ComHeader/ComHeader";

export default function Page3({ navigation }) {
  return (
    <>
      <ComHeader title={"Captains screen"} showTitle />
      <View style={styles.container}>
        {/* <Header /> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles?.scrollView}
        >
          {/* list sản phẩm */}
          <Product />
          <View style={{ height: 120 }}></View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 40,
  },
});
