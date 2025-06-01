import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";

export default function EnterOtpScreen({ route, navigation }) {
  const { contact } = route.params;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [shakeAnim] = useState(new Animated.Value(0));
  const inputs = useRef([]);

  const animatedScales = otp.map(() => useRef(new Animated.Value(1)).current);

  // Countdown logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 8,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -8,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 4,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 60,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const verifyOtp = (code) => {
    if (code === "1234") {
      navigation.replace("MainApp");
    } else {
      startShake();
    }
  };

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < 3) inputs.current[index + 1].focus();
    } else if (text === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }

    const fullOtp = [...otp];
    fullOtp[index] = text;
    if (fullOtp.every((d) => d.length === 1)) {
      verifyOtp(fullOtp.join(""));
    }
  };

  const resendCode = () => {
    setOtp(["", "", "", ""]);
    inputs.current[0].focus();
    setTimer(30);
    alert("A new OTP has been sent.");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter the 4-digit code sent to <Text style={styles.contact}>{contact}</Text>
        </Text>

        <Animated.View
          style={[
            styles.otpContainer,
            { transform: [{ translateX: shakeAnim }] },
          ]}
        >
          {otp.map((digit, index) => (
            <Animated.View
              key={index}
              style={[
                styles.animatedBox,
                {
                  transform: [
                    {
                      scale: animatedScales[index],
                    },
                  ],
                  borderColor:
                    focusedIndex === index ? "#F472B6" : "#444",
                },
              ]}
            >
              <TextInput
                ref={(ref) => (inputs.current[index] = ref)}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onFocus={() => {
                  setFocusedIndex(index);
                  Animated.spring(animatedScales[index], {
                    toValue: 1.15,
                    useNativeDriver: true,
                  }).start();
                }}
                onBlur={() => {
                  setFocusedIndex(null);
                  Animated.spring(animatedScales[index], {
                    toValue: 1,
                    useNativeDriver: true,
                  }).start();
                }}
                onChangeText={(text) => handleChange(text, index)}
              />
            </Animated.View>
          ))}
        </Animated.View>

        {timer > 0 ? (
          <Text style={styles.timerText}>
            Resend code in <Text style={styles.timerNumber}>{timer}s</Text>
          </Text>
        ) : (
          <TouchableOpacity onPress={resendCode}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    paddingHorizontal: 28,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontFamily: "Outfit_600SemiBold",
    color: "#F472B6",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Outfit_400Regular",
    color: "#E2B8D6",
    marginBottom: 30,
    textAlign: "center",
  },
  contact: {
    fontFamily: "Outfit_600SemiBold",
    color: "#DB2777",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 24,
  },
  animatedBox: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 12,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
  },
  otpInput: {
    fontSize: 24,
    fontFamily: "Outfit_600SemiBold",
    color: "#F9A8D4",
    textAlign: "center",
  },
  timerText: {
    fontSize: 14,
    fontFamily: "Outfit_400Regular",
    color: "#C084FC",
  },
  timerNumber: {
    fontFamily: "Outfit_600SemiBold",
  },
  resendText: {
    fontSize: 15,
    fontFamily: "Outfit_600SemiBold",
    color: "#EC4899",
  },
});
