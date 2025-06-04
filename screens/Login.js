// Using useState to manage the state of the input field
import React, { useState } from "react";
// Importing necessary libraries and components from React Native
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [emailOrPhone, setEmailOrPhone] = useState("");
// Function to handle sending OTP after basic validation
  const handleSendOTP = () => {
    // Trim input to remove leading/trailing spaces
    if (!emailOrPhone.trim()) {
      alert("Please enter your email or phone number.");
      return;
    }
    navigation.navigate("EnterOtp", { contact: emailOrPhone });
  };

  return (
    // Ensures keyboard doesn't cover inputs on iOS
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
        // ScrollView allows the content to be scrollable, especially useful on smaller screens
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
          {/* Main content container */}
        <View style={styles.innerContainer}>
          {/* Header Image */}
          <Image
            source={require("../assets/login.png")}
            style={styles.image}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={styles.heading}>Welcome Back 👋</Text>
          <Text style={styles.subText}>
            Login to continue your shopping journey!
          </Text>

          {/* Input */}
          <TextInput
            style={styles.input}
            placeholder="Email or Phone Number"
            placeholderTextColor="#B088C9"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
          />

          {/* Button to trigger OTP */}
          <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
 // Styles for all UI elements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // dark background
  },
  innerContainer: {
    paddingHorizontal: 28,
    paddingTop: 20,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontFamily: "Outfit_600SemiBold",
    color: "#F472B6", // vibrant pink
    marginBottom: 4,
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    fontFamily: "Outfit_400Regular",
    color: "#E2B8D6",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 52,
    borderWidth: 1.5,
    borderColor: "#F472B6",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#1e1e1e",
    fontSize: 16,
    color: "#fff",
    fontFamily: "Outfit_400Regular",
    marginBottom: 24,
  },
  button: {
    width: "100%",
    backgroundColor: "#DB2777",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Outfit_600SemiBold",
  },
});
