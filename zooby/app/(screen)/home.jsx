import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Home() {
  return (
   <View style={{flex:1}}>
      {/* Background Video */}
      <Video
        source={require("../../assets/images/animalbg.mp4")}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFill}
      />

      {/* Overlay Gradient */}
      <LinearGradient
        colors={["rgba(243, 240, 240, 0.73)", "rgba(58, 58, 58, 0.04)"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.container}>
        {/* Header Image */}
        <View style={styles.headerWrapper}>
          <Image
            source={require("../../assets/images/text3.png")}
            style={styles.headerImage}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {/* Animal Safari */}
          <Link href={"/(animals)/animalsafari"} asChild>
            <Pressable>
              <LinearGradient
                colors={["#1aff1a", "#006622"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.gradientButton}
              >
                <View style={styles.buttonContent}>
                  <Image
                    source={require("../../assets/images/animal1.png")}
                    style={styles.buttonImage}
                  />
                  <Text style={styles.buttonText}>Animal Safari</Text>
                </View>
              </LinearGradient>
            </Pressable>
          </Link>

          {/* Game Zone */}
          <Link href={"/(game)/gamezone"} asChild>
            <Pressable>
              <LinearGradient
                colors={["#6666ff", "#0000cc"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.gradientButton}
              >
                <View style={styles.buttonContent}>
                  <Image
                    source={require("../../assets/images/gamezone1.png")}
                    style={styles.buttonImage}
                  />
                  <Text style={styles.buttonText}>Game Zone</Text>
                </View>
              </LinearGradient>
            </Pressable>
          </Link>

          {/* Kids Song */}
              <Link href={"/(songs)/categorysong"} asChild>
            <Pressable>
              <LinearGradient
                colors={["#ffb3d1", "#ff0066"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.gradientButton}
              >
                <View style={styles.buttonContent}>
                  <Image
                    source={require("../../assets/images/kids.png")}
                    style={styles.buttonImage}
                  />
                  <Text style={styles.buttonText}>Kids Songs</Text>
                </View>
              </LinearGradient>
            </Pressable>
          </Link>
        </View>
      </View>
       <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "black" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 40,
  },
  headerWrapper: {
    marginTop: 40,
    alignItems: "center",
    marginBottom: 30,
  },
  headerImage: {
    width: 350,
    height: 100,
    resizeMode: "contain",
  },
  buttonContainer: {
    width: "100%",
    gap: 20,
  },
  gradientButton: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 20,
  },
  buttonImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  buttonText: {
    color: "#ffff00",
    fontSize: 25,
    fontWeight: "900",
  },
});
