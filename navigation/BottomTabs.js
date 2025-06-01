import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/BottomTabs/Home";
import CartScreen from "../screens/BottomTabs/Cart";
import OrderScreen from "../screens/BottomTabs/Orders";
import ProfileScreen from "../screens/BottomTabs/Profile";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {

          backgroundColor: "#1F1F22", // Dark theme
          borderTopWidth: 0,
        },
        tabBarIcon: ({ focused }) => {
          let iconName, label;

          if (route.name === "Home") {
            iconName = "home";
            label = "Home";
          } else if (route.name === "Cart") {
            iconName = "cart";
            label = "Cart";
          } else if (route.name === "Orders") {
            iconName = "list";
            label = "Orders";
          } else if (route.name === "Profile") {
            iconName = "person";
            label = "Profile";
          }

          return (
            <View style={styles.tab}>
              <Ionicons
                name={iconName}
                size={20}
                color={focused ? "#DB2777" : "#888"} // Pink when focused
              />
              <Text
                style={{
                  fontSize: 9,
                  fontFamily: "Outfit_500Medium",
                  color: focused ? "#DB2777" : "#888",
                  marginTop: 0,
                }}
              >
                {label}
              </Text>
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Orders" component={OrderScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
});
