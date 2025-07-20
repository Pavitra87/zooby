import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import { useRouter, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";

const CategorySong = () => {
   const API_URL=process.env.EXPO_PUBLIC_API_URL;
  const [songcategories, setSongCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/songcategory`)
      .then((res) => {
        console.log("Fetched song categories:", res.data);
        setSongCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching song categories:", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

    useLayoutEffect(() => {
      navigation.setOptions({
        title: "Song Categories",
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
        source={require("../../../assets/images/kidsbg2.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {loading ? (
            <ActivityIndicator size="large" color="#49e600" />
          ) : songcategories.length === 0 ? (
            <Text style={styles.noDataText}>No song categories found.</Text>
          ) : (
            <FlatList
              data={songcategories}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <Animatable.View
                  animation="fadeInUp"
                  duration={700}
                  delay={index * 200}
                  easing="ease-in-out"
                  useNativeDriver
                >
                  <Pressable
                    style={styles.item}
                    onPress={() => router.push(`/(songs)/${item._id}`)}
                  >
                    <Text style={styles.itemText}>
                      {item.language
                        ? item.language.charAt(0).toUpperCase() +
                          item.language.slice(1)
                        : "Unknown"}
                    </Text>
                  </Pressable>
                </Animatable.View>
              )}
              contentContainerStyle={{ paddingBottom: 40 }}
            />
          )}
        </View>
      </ImageBackground>
      <SafeAreaView
        edges={["bottom"]}
        style={{ backgroundColor: "black" }}
      />
    </View>
  );
};

export default CategorySong;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  item: {
    marginTop: 5,
    padding: 20,
    backgroundColor: "#eeffe6",
    borderRadius: 8,
    marginBottom: 12,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#49e600",
  },
  itemText: {
    fontSize: 26,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  noDataText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
