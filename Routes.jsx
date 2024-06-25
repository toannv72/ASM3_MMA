import React, { useCallback } from "react";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/page/Home/Home";
import ComIcon from "./src/Components/ComIcon/ComIcon";
import ServiceHistoryDetail from "./src/page/ServiceHistory/ServiceHistoryDetail/ServiceHistoryDetail";
import Like from "./src/page/Like/Like";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
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
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Homess"
        component={Home}
      />
      <HomeStack.Screen
        name="Details"
        options={{ headerShown: false }}
        component={ServiceHistoryDetail}
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
        component={ServiceHistoryDetail}
      />
    </LikePage.Navigator>
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
          } else if (route.name === "HealthCondition") {
            iconName = focused ? "Nav3" : "Nav3_1";
          } else if (route.name === "Notification") {
            iconName = focused ? "Nav4" : "Nav4_1";
          } else if (route.name === "Account") {
            iconName = focused ? "Nav5" : "Nav5_1";
          }

          // You can return any component that you like here!
          // return <Ionicons name={iconName} size={size} color={"back"} />;
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
        name="Account"
        options={{ headerShown: false }}
        component={LikePageScreen}
      />
    </Tab.Navigator>
  );
}

export default Routes;
