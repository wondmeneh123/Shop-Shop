import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

export default function ProfileScreen({ navigation }) {
  const headerAnim = useRef(new Animated.Value(-50)).current;
  const avatarScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(headerAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(avatarScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.header, { transform: [{ translateY: headerAnim }] }]}>

        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </Animated.View>

      {/* Profile Picture */}
      <Animated.View style={[styles.avatarWrapper, { transform: [{ scale: avatarScale }] }]}>
      <Image
          source={{
            uri: "https://avatars.githubusercontent.com/u/172116313?v=4&size=64",
          }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Feather name="edit-2" size={14} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* User Info */}
      <Text style={styles.userName}>Haile Solomon</Text>

      {/* Menu */}
      <View style={styles.menu}>
        <MenuItem icon="lock-closed" label="Privacy & Setting" />
        <MenuItem icon="notifications-outline" label="Notifications" />
        <MenuItem icon="time-outline" label="Order History" />
        <MenuItem icon="location-outline" label="Shipping Address" />
      </View>

      {/* Sign Out */}
      <TouchableOpacity style={styles.signOut}>
        <Ionicons name="log-out-outline" size={18} color="#DB2777" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function MenuItem({ icon, label }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuIconWrapper}>
        <Ionicons name={icon} size={20} color="#DB2777" />
      </View>
      <Text style={styles.menuLabel}>{label}</Text>
      <Feather name="chevron-right" size={20} color="#aaa" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
  },
  avatarWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#DB2777",
  },
  editIcon: {
    backgroundColor: "#DB2777",
    position: "absolute",
    bottom: 0,
    right: windowWidth * 0.35,
    padding: 6,
    borderRadius: 20,
  },
  userName: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Outfit_600SemiBold",
    color: "#fff",
  },
  menu: {
    marginTop: 30,
    gap: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  menuIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2D2D30",
    justifyContent: "center",
    alignItems: "center",
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Outfit_400Regular",
    color: "#ddd",
  },
  signOut: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    alignSelf: "center",
    gap: 8,
    backgroundColor: "#2D2D30",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
  },
  signOutText: {
    fontSize: 14,
    color: "#DB2777",
    fontFamily: "Outfit_600SemiBold",
  },
});
