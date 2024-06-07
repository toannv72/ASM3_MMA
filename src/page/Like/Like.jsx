import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import ComHeader from "../../Components/ComHeader/ComHeader";
import News from './News/News';

export default function Like() {
  return (
    <>
      <ComHeader title={"like"} showTitle />
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles?.scrollView}
        >
          <News />
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
    paddingTop: 40,
  },
});
