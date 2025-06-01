import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OnboardingScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleDone = async () => {
    await AsyncStorage.setItem("onboardingComplete", "true");
    navigation.replace("Login");
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/onboarding.png")}
        style={styles.image}
        resizeMode="contain"
      />

  
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>Welcome to BOSS Market</Text>
        <Text style={styles.subtitle}>
          Discover trends. Enjoy deals. Shop smart.
        </Text>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleDone}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827", // dark background
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  image: {
    width: 220,
    height: 160,
    marginBottom: 20,
  },
  circle: {
    width: 90,
    height: 90,
    backgroundColor: "#DB2777",
    borderRadius: 45,
    marginBottom: 24,
    shadowColor: "#DB2777",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontFamily: "Outfit_600SemiBold",
    color: "#F472B6",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Outfit_400Regular",
    color: "#D1D5DB",
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#DB2777",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Outfit_600SemiBold",
  },
});
