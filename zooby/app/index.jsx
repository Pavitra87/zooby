import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video } from "expo-av";
const Index = () => {
 
  const [showImage, setShowImage] = useState(false);

  return (
  
     <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <LinearGradient
        colors={["#0000", "#54ff54"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 2, y: 2 }}
        style={styles.container}
      >
        <View style={styles.container}>
          <>
               <Video
                source={require("../assets/images/cute-fox-video.mp4")}
                style={styles.video}
                resizeMode="contain"
                shouldPlay
                isLooping
              /> 

              <Text
                style={[
                  styles.heading,
                  {
                    backgroundColor: "transparent",
                    // fontFamily: "DancingScript_700Bold",
                  },
                ]}
              >
                Zooby
              </Text>
            </>
         

          <Link href="/(auth)/login" asChild>
            <TouchableOpacity style={styles.button}>
              <View style={styles.imageButtonWrapper}>
                <Image
                  source={require("../assets/images/button.png")}
                  style={styles.buttonImage}
                />
                <Text style={styles.textOnImage}>Get started</Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>
      </LinearGradient>
 </SafeAreaView>
  
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,

    alignItems: "center",
    gap: 20,
    // padding: 20,
  },
  heading: {
    fontSize: 100,
    fontWeight: "bold",
    marginBottom: 25,
    // fontFamily: "DancingScript_700Bold",
    color: "#ffff00",
  },
  video: {
    width: 400,
    height: 350,
    marginBottom: 20,
    borderRadius: 10,
  },

  imageButtonWrapper: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    position: "absolute",
  },

  textOnImage: {
    fontSize: 22,
    fontWeight: "700",

    color: "#ccc",
  },
});



