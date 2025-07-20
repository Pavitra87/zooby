import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";




const AnimalInfo = () => {
   const API_URL=process.env.EXPO_PUBLIC_API_URL;
  const { animalId } = useLocalSearchParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      });
  }, [animalId]);
  useLayoutEffect(() => {
    if (animal?.animalname) {
      const title =
        animal.animalname.charAt(0).toUpperCase() +
        animal.animalname.slice(1) +
        " Info";

      navigation.setOptions({
        title,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 27,
          color: "#666600",
        }
      });
    }
  }, [navigation, animal]);
  if (loading)
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#3399ff" />
    );
  if (!animal) return <Text style={{ padding: 20 }}>Animal not found</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={styles.container}>
        {animal.images?.[0] && (
          <Image
            source={{ uri: `${API_URL}/uploads/${animal.images[0]}` }}
            style={styles.infoImage}
          />
        )}

        {/* Animate only scrollable content */}
        <Animatable.View
          animation="fadeInUp"
          duration={800}
          delay={100}
          easing="ease-in-out"
          useNativeDriver
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.details}>
              <Animatable.View
                animation="fadeInLeft"
                duration={800}
                delay={100}
                easing="ease-in-out"
                useNativeDriver
                style={{ flex: 1 }}
              >
                <Text style={styles.infoTitle}>
                  {animal.animalname?.charAt(0).toUpperCase() +
                    animal.animalname?.slice(1)}
                </Text>
              </Animatable.View>
              <Animatable.View
                animation="fadeInRight"
                duration={800}
                delay={100}
                easing="ease-in-out"
                useNativeDriver
                style={{ flex: 1 }}
              >
                <Text style={styles.descriptionText}>
                  {animal.info?.description || "No info available."}
                </Text>
              </Animatable.View>
            </View>
            <Animatable.View
              animation="fadeInUp"
              duration={800}
              delay={100}
              easing="ease-in-out"
              useNativeDriver
              style={{ flex: 1 }}
            >
              <View style={styles.highlightBox}>
                <Text style={styles.highlightText}>
                  Scientific Name:{" "}
                  <Text style={styles.normalText}>
                    {animal.info?.scientificName || "N/A"}
                  </Text>
                </Text>
                <Text style={styles.highlightText}>
                  Trophic Level:{" "}
                  <Text style={styles.normalText}>
                    {animal.info?.TrophicLevel || "No info available."}
                  </Text>
                </Text>
                <Text style={styles.highlightText}>
                  Gestation Period:{" "}
                  <Text style={styles.normalText}>
                    {animal.info?.lifeSpan || "No info available."}
                  </Text>
                </Text>
                <Text style={styles.highlightText}>
                  Life Span:{" "}
                  <Text style={styles.normalText}>
                    {animal.info?.lifeSpan || "No info available."}
                  </Text>
                </Text>
                <Text style={styles.highlightText}>
                  Mass:{" "}
                  <Text style={styles.normalText}>
                    {animal.info?.lifeSpan || "No info available."}
                  </Text>
                </Text>
                <Text style={styles.highlightText}>
                  Life Span:{" "}
                  <Text style={styles.normalText}>
                    {animal.info?.lifeSpan || "No info available."}
                  </Text>
                </Text>
                <Text style={styles.highlightText}>
                  Mass:{" "}
                  <Text style={styles.normalText}>
                    {animal.info?.lifeSpan || "No info available."}
                  </Text>
                </Text>
              </View>
            </Animatable.View>
          </ScrollView>
        </Animatable.View>
      </View>
       <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "black" }} />
    </View>
  );
};

export default AnimalInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6cc",
  },
  infoImage: {
    width: "100%",
    height: 250,
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
  },
  infoTitle: {
    fontSize: 27,
    fontWeight: "900",
    marginBottom: 10,
    textAlign: "left",
    color: "#000033",
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 15,
    color: "#000",
  },
  normalText: {
    fontWeight: "normal",
    color: "#333",
  },
  highlightText: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: "orange",
    borderRadius: 8,
    padding: 15,
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
    backgroundColor: "#ffe680",
  },
  details: {
    marginBottom: 15,
  },
});
