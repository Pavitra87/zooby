import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { useRouter, Link, useNavigation } from "expo-router";
import {
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
  getIdToken,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import { auth } from "../../firebaseConfig";

import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const GOOGLE_CLIENT_ID =
  "89956372977-f11a05c89s59iirq0fnqnmf0m1jdks69.apps.googleusercontent.com";
const FACEBOOK_APP_ID = "2363412490721142";
const redirectUri = "https://auth.expo.io/@pavitranaik/zooby";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const router = useRouter();
  const navigation = useNavigation();

  const [mode, setMode] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState(null);

  //google login----------------------------------------------------------

  const discovery = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
    revocationEndpoint: "https://oauth2.googleapis.com/revoke",
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: GOOGLE_CLIENT_ID,
      scopes: ["profile", "email"],
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
      responseType: "id_token",
      usePKCE: false,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          setUserInfo(userCredential.user);
        })
        .catch((err) => {
          console.error("Firebase Sign-In Error", err);
        });
    }
  }, [response]);

  //facebook login--------------------------------------------------
  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_APP_ID,

    // redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    redirectUri,
  });
  // console.log("Facebook redirect URI:", redirectUri);
  useEffect(() => {
    if (fbResponse?.type === "success") {
      const { access_token } = fbResponse.params;
      const facebookCredential = FacebookAuthProvider.credential(access_token);
      signInWithCredential(auth, facebookCredential)
        .then(async (userCredential) => {
          const token = await userCredential.user.getIdToken();
          // await axios.post(`${API_URL}/api/auth/loginwithemail`, { token });
          Alert.alert("Facebook Login Successful");
          router.replace("/(screen)/home");
        })
        .catch((err) => {
          Alert.alert("Firebase Facebook Login Error", err.message);
        });
    }
  }, [fbResponse]);

  // === Email/Password Login --------------------------------------------------
 const handleLoginWithEmail = async (email, password) => {
  if (!email || !password) {
    return Alert.alert("Missing Fields", "Please enter both email and password.");
  }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await getIdToken(userCredential.user);
      await axios.post(`${API_URL}/api/auth/login`, { token });
       console.log(res.data.user);

      Alert.alert("Login Successful", "Welcome!");
      router.replace("/(screen)/home");
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      Alert.alert("Login Error", message);
    } finally {
      setLoading(false);
    }
  };

  // === Mobile OTP Send ===
  // const handleSendOTP = async () => {
  //   if (!mobile || mobile.length !== 10) {
  //     return Alert.alert("Invalid Mobile", "Enter a valid 10-digit number");
  //   }

  //   try {
  //     // const confirmation = await signInWithPhoneNumber(
  //     //   auth,
  //     //   `+91${mobile}`,
  //     //   recaptchaVerifier.current
  //     // );
  //     // setConfirmationResult(confirmation);
  //     // Alert.alert("OTP sent", "Check your phone");
  //   } catch (err) {
  //     Alert.alert("OTP Error", err.message);
  //   }
  // };

  // === Mobile OTP Verify ===
  // const handleVerifyOTP = async () => {
  //   if (!otp || !confirmationResult) {
  //     return Alert.alert("OTP Missing", "Please enter the OTP sent to your phone");
  //   }

  //   try {
  //     const result = await confirmationResult.confirm(otp);
  //     const token = await result.user.getIdToken();

  //     const response = await axios.post(`${API_URL}/api/auth/loginwithemail`, {
  //       token,
  //     });

  //     Alert.alert("Login Successful", `Welcome ${response.data.user.name}`);
  //     router.replace("/(auth)/home");
  //   } catch (err) {
  //     Alert.alert("OTP Login Error", err.message);
  //   }
  // };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Login",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#006600",
      },
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/leaf1.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.formContainer}>
            {mode === "email" ? (
              <>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />

                <Text style={styles.label}>Password:</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />

                <View style={styles.imageButtonWrapper}>
                 <TouchableOpacity
onPress={() => handleLoginWithEmail(email, password)}

  disabled={loading}
>
                    <Image
                      source={require("../../assets/images/button.png")}
                      style={styles.buttonImage}
                    />
                    <Text style={styles.textOnImage}>
                      {loading ? "Logging in..." : "Login with Email"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={{ textAlign: "center" }}>Or login with</Text>
                <View style={styles.socialIcons}>
                  <TouchableOpacity onPress={() => promptAsync()}>
                    {userInfo && <Text>Welcome, {userInfo.displayName}</Text>}
                    <Image
                      source={require("../../assets/icons/google.png")}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => fbPromptAsync()}>
                    <Image
                      source={require("../../assets/icons/fb.png")}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.label}>Mobile Number:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={10}
                  value={mobile}
                  onChangeText={(text) =>
                    setMobile(text.replace(/[^0-9]/g, ""))
                  }
                />

                {/* <Button title="Send OTP" onPress={handleSendOTP} /> */}

                <Text style={styles.label}>Enter OTP:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={6}
                  value={otp}
                  onChangeText={setOtp}
                />

                {/* <Button title="Verify OTP & Login" onPress={handleVerifyOTP} /> */}
              </>
            )}

            <View style={styles.toggleMode}>
              <Text>
                {mode === "email"
                  ? "Want to login via OTP?"
                  : "Prefer Email/Password?"}
              </Text>
              <TouchableOpacity
                onPress={() => setMode(mode === "email" ? "mobile" : "email")}
              >
                <Text style={styles.toggleText}>
                  {mode === "email" ? "Use Mobile/OTP" : "Use Email/Password"}
                </Text>
              </TouchableOpacity>
            </View>

            <Link href="/(auth)/signup" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                  Don't have an account?{" "}
                  <Text style={{ color: "blue" }}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ImageBackground>
      <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "black" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    padding: 20,
  },
  formContainer: {
    marginTop: 200,
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
  toggleMode: {
    marginTop: 20,
    alignItems: "center",
  },
  toggleText: {
    color: "#2980b9",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  buttonText: {
    marginTop: 10,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 10,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
});
