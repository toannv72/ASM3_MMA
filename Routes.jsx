import React, { useCallback } from "react";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/page/Home/Home";
import ComIcon from "./src/Components/ComIcon/ComIcon";
import Detail from "./src/page/Detail/Detail";
import Like from "./src/page/Like/Like";
import Page3 from "./src/page/Page3/Page3";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// giữ nguyên không được thay đổi
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homes">
        <Stack.Screen
          name="Homes"
          options={{ headerLeft: null, headerShown: false }}
          component={MyBottomNavigationBar}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const HomeStack = createNativeStackNavigator();
function HomeStackScreen({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      navigation.navigate("Homess");
      return () => {};
    }, [])
  );
  return (
    <HomeStack.Navigator initialRouteName="Homess">
      {/* trang chủ  */}
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Homess"
        component={Home}
      />
      {/* chi tiết  */}
      <HomeStack.Screen
        name="Details"
        options={{ headerShown: false }}
        component={Detail}
      />
    </HomeStack.Navigator>
  );
}

const LikePage = createNativeStackNavigator();
function LikePageScreen({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      navigation.navigate("Like");
      return () => {};
    }, [])
  );
  return (
    <LikePage.Navigator>
      <LikePage.Screen
        options={{ headerShown: false }}
        name="Like"
        component={Like}
      />
      <LikePage.Screen
        name="Details"
        options={{ headerShown: false }}
        component={Detail}
      />
    </LikePage.Navigator>
  );
}

const page3Navigator = createNativeStackNavigator();
function Page3Screen({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      navigation.navigate("page3");
      return () => {};
    }, [])
  );
  return (
    <page3Navigator.Navigator>
      <page3Navigator.Screen
        options={{ headerShown: false }}
        name="page3"
        component={Page3}
      />
      <page3Navigator.Screen
        name="Details"
        options={{ headerShown: false }}
        component={Detail}
      />
    </page3Navigator.Navigator>
  );
}
function MyBottomNavigationBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: "#14A499",
          borderRadius: 15,
          height: 90,
          elevation: 30, // Bóng đổ cho Android
          shadowColor: "#000", // Màu của bóng đổ cho iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 3.84,
          elevation: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "Nav1" : "Nav1_1";
          } else if (route.name === "Visitation") {
            iconName = focused ? "Nav2" : "Nav2_1";
          } else  if (route.name === "Account") {
            iconName = focused ? "Nav5" : "Nav5_1";
          }
          return <ComIcon icon={iconName} />;
        },
      })}
      // keyboardShouldPersistTaps="handled"
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeStackScreen}
      />

      <Tab.Screen
        name="Visitation"
        options={{ headerShown: false }}
        component={Page3Screen}
      />
      <Tab.Screen
        name="Account"
        options={{ headerShown: false }}
        component={LikePageScreen}
      />
    </Tab.Navigator>
  );
}

export default Routes;
