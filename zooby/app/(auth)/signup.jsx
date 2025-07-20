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
import { useRouter, Link, useNavigation } from "expo-router";
import { createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup() {
     const API_URL=process.env.EXPO_PUBLIC_API_URL;

  const router = useRouter();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
      navigation.setOptions({
        title: "Sign Up",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 24,
          color: "#006600",
         
        },
      });
    }, [navigation]);

  const handleSignup = async (name, email, password, mobile) => {
    // if (!name || !email || !mobile || !password) {
    //   return Alert.alert("Error", "All fields are required.");
    // }

    // if (!/^\S+@\S+\.\S+$/.test(email)) {
    //   return Alert.alert("Invalid Email", "Please enter a valid email address.");
    // }

    // if (mobile.length !== 10) {
    //   return Alert.alert("Invalid Mobile", "Mobile number must be 10 digits.");
    // }

    // if (password.length < 6) {
    //   return Alert.alert("Weak Password", "Password should be at least 6 characters.");
    // }

    // setLoading(true);
    try {
       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const token = await getIdToken(userCredential.user);

      await axios.post(`${API_URL}/api/auth/registerwithemail`, {
        email,
        password,
        name,
        mobile,
          token,
        // firebaseUid: user.uid,
      });

      Alert.alert("Success", "Signup successful!");
      router.replace("/(screen)/home");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      Alert.alert("Signup Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex:1}}>
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
              />

              <Text style={styles.label}>Mobile No:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={10}
                value={mobile}
                onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ""))}
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
  background: {
    flex: 1,
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  formContainer: {
    backgroundColor:"#99ff99",
  marginTop:150,
    padding: 20,
    borderRadius: 10,
    // shadowColor: "#000",
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
