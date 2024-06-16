import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import bill from "../../../assets/profile_icons/bill.png";

const MenuItem = ({ iconName, text, link, colorRed, number, status }) => {
  const navigation = useNavigation();

  const press = () => {
   if (status) {
     navigation.navigate(link, { itemData: status });
  } else {
      navigation.navigate(link); 
  } 
  };
  return (
    <TouchableOpacity style={styles.menuItem} onPress={() => press()}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          paddingHorizontal: 4,
          gap: 10,
        }}
      >
        <Image source={iconName} style={styles.image} />
        {colorRed ? (
          <Text style={{ fontSize: 18, color: "red", fontWeight: "500" }}>
            {text}
          </Text>
        ) : (
          <Text style={{ fontSize: 18, fontWeight: "500" }}>{text}</Text>
        )}
      </View>
      {colorRed || (
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{number}</Text>
      )}
    </TouchableOpacity>
  );
};

const MenuList = ({ data, colorRed }) => {
  return (
    <View style={styles.container}>
      {data.map((value, index) => (
        <MenuItem
          key={index}
          colorRed={colorRed}
          iconName={value.icon}
          text={value.name}
          link={value.link}
          number={value.number}
          status={value.status}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff", // Màu nền xám nhạt
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 16,
  },
});

export default MenuList;
