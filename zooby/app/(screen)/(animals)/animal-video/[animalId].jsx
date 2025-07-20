import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video } from "expo-av";
import axios from "axios";



const AnimalVideo = () => {
   const API_URL=process.env.EXPO_PUBLIC_API_URL;
  const { animalId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/animals/${animalId}`)
      .then((res) => {
        setAnimal(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Error", "Failed to load animal video");
        setLoading(false);
      });
  }, [animalId]);

  useLayoutEffect(() => {
    if (animal?.animalname) {
      navigation.setOptions({
        title:
          animal.animalname.charAt(0).toUpperCase() +
          animal.animalname.slice(1) +
          " " +
          "Video",
        headerTitleAlign: "center",
        headerTintColor: "#333",
      });
    }
  }, [navigation, animal]);

  if (loading)
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#00f" />;

  if (!animal?.video)
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>No video available</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: `${API_URL}/uploads/${animal.video}` }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        shouldPlay
      />
       <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "black" }} />
    </View>
  );
};

export default AnimalVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: 300,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
