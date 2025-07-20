import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import { Audio } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";




const Animal = () => {
   const API_URL=process.env.EXPO_PUBLIC_API_URL;
  const { animalId } = useLocalSearchParams();
  const [animal, setAnimal] = useState(null);

  const [soundObject, setSoundObject] = useState(null);

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/animals/${animalId}`)
      .then((res) => {
        setAnimal(res.data);

        setLoading(false);
      })

      .catch((err) => {
        console.error(err);
        Alert.alert("Error", "Failed to load animal details");
        setLoading(false);
      });

    return () => {
      if (soundObject) soundObject.unloadAsync();
    };
  }, [animalId]);

  const playSound = async (url) => {
    try {
      if (soundObject) await soundObject.unloadAsync();
      const { sound } = await Audio.Sound.createAsync({ uri: url });
      setSoundObject(sound);
      await sound.playAsync();
    } catch (error) {
      Alert.alert("Error", "Audio playback failed");
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    if (animal?.animalname) {
      const title =
        animal.animalname.charAt(0).toUpperCase() + animal.animalname.slice(1);

      navigation.setOptions({
        title,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 27,
          color: "#666600",
        },
      });
    }
  }, [navigation, animal]);
  if (loading)
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#3399ff" />
    );
  if (!animal) return <Text style={{ padding: 20 }}>Animal not found</Text>;

  return (
    <View style={styles.container}>
      {/* Top Half: Animal Image */}
      <View style={styles.topHalf}>
        {animal.images?.[1] && (
          <Image
            source={{ uri: `${API_URL}/uploads/${animal.images[1]}` }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>

      <View style={styles.bottomHalf}>
        <View style={styles.footer}>
          <Pressable
            style={styles.button}
            onPress={() => playSound(`${API_URL}/uploads/${animal.sound}`)}
          >
            <AntDesign
              name="sound"
              size={24}
              color="black"
              style={styles.buttonText}
            />
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() =>
              playSound(`${API_URL}/uploads/${animal.pronunciation}`)
            }
          >
            <Entypo
              name="sound"
              size={24}
              color="black"
              style={styles.buttonText}
            />
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => router.push(`/(animals)/animal-info/${animal._id}`)}
          >
            <Entypo
              name="info-with-circle"
              size={24}
              color="black"
              style={styles.buttonText}
            />
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() =>
              router.push(`/(animals)/animal-video/${animal._id}`)
            }
          >
            <Entypo name="video" size={24} color="black" />
          </Pressable>
        </View>
      </View>
       <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "black" }} />
    </View>
  );
};

export default Animal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  topHalf: {
    flex: 1,
  },
  bottomHalf: {
    paddingTop: 1,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoBox: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  footer: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 10,
  backgroundColor: "rgb(119, 255, 70)", 
  padding: 10,
   
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.4,
  shadowRadius: 6,
  elevation: 8, 
},
button: {
  flex: 1,
  paddingVertical: 14,
  alignItems: "center",
  backgroundColor: "#fff", 
  borderRadius: 100,
  elevation: 2,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
},

  videoWrapper: {
    height: 250,
    backgroundColor: "#000",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
