import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ComButton({ children, onPress, check = false, style }) {
  return (
    <TouchableOpacity
      style={[styles.button, check && styles.buttonChecked, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, check && styles.buttonTextChecked]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#33B39C", // Màu nền mặc định
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonChecked: {
    backgroundColor: "blue", // Màu nền khi check = true
  },
  buttonText: {
    color: "white", // Màu chữ mặc định
    fontWeight: "bold",
  },
  buttonTextChecked: {
    color: "yellow", // Màu chữ khi check = true
  },
});
