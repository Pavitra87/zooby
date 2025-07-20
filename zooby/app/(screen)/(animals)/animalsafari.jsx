import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import { useRouter, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";


const Categories = () => {
   const API_URL=process.env.EXPO_PUBLIC_API_URL;
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/animalcategory`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  useLayoutEffect(() => {
    if (categories.length > 0) {
      const firstCategory =
        categories[0].category.charAt(0).toUpperCase() +
        categories[0].category.slice(1);

      navigation.setOptions({
        title: firstCategory,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 24,
          color: "#006600",
        },
      });
    }
  }, [categories, navigation]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/images/wild4.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <FlatList
            data={categories}
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
                  onPress={() => router.push(`/(animals)/${item._id}`)}
                >
                  <Text style={styles.itemText}>
                    {item.category?.charAt(0).toUpperCase() +
                      item.category?.slice(1)}
                  </Text>
                </Pressable>
              </Animatable.View>
            )}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </View>
      </ImageBackground>
      <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "black" }} />
    </View>
  );
};

export default Categories;

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
    marginTop:5,
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
});
