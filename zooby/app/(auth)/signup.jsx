import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
  Platform,
} from "react-native";

import axios from "axios";
import React, { useState, useLayoutEffect } from "react";
import { useRouter, Link } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup() {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    router.setOptions?.({
      title: "Sign Up",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#006600",
      },
    });
  }, []);

  const handleSignup = async () => {
    if (!email || !password || !name || !mobile) {
      Alert.alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUid = userCredential.user.uid;

      await axios.post(`${API_URL}/api/auth/register`, {
        email,
        password,
        name,
        mobile,
        firebaseUid,
      });

      Alert.alert("Registration successful");
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert(
        "Signup failed",
        error.response?.data?.message || "Try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={require("../../assets/images/leaf1.png")}
          style={styles.background}
          resizeMode="cover"
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              <View style={styles.formContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />

                <Text style={styles.label}>Email:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />

                <Text style={styles.label}>Mobile No:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={10}
                  value={mobile}
                  onChangeText={(text) =>
                    setMobile(text.replace(/[^0-9]/g, ""))
                  }
                />

                <Text style={styles.label}>Password:</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />

                <View style={styles.imageButtonWrapper}>
                  <TouchableOpacity onPress={handleSignup} disabled={loading}>
                    <Image
                      source={require("../../assets/images/button.png")}
                      style={styles.buttonImage}
                    />
                    <Text style={styles.textOnImage}>
                      {loading ? "Signing Up..." : "Sign Up"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Link href="/(auth)/login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.buttonText}>
                      Already have an account?{" "}
                      <Text style={{ color: "blue" }}>Login</Text>
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>

      <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "black" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center" },
  scrollContainer: { flexGrow: 1, justifyContent: "center" },
  container: { padding: 20, flex: 1, justifyContent: "center" },
  formContainer: {
    backgroundColor: "#99ff99",
    marginTop: 150,
    padding: 20,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },
  imageButtonWrapper: {
    position: "relative",
    width: "100%",
    height: 50,
    marginBottom: 15,
    marginTop: 20,
  },
  buttonImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    resizeMode: "cover",
  },
  textOnImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonText: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
