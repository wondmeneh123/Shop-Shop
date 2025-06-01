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
          height: 60, // Slightly increased height for more space
          paddingBottom: 5, // Added padding for better spacing
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
                size={22} // Slightly larger icons
                color={focused ? "#DB2777" : "#888"}
              />
              <Text
                style={{
                  fontSize: 10, // Slightly larger font size
                  fontFamily: "Outfit_500Medium",
                  color: focused ? "#DB2777" : "#888",
                  marginTop: 2, // Adjusted spacing between icon and text
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
    paddingTop: 8, // Adjusted padding for better alignment
  },
});
