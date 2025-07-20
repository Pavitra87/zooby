import { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";




const AnimalList = () => {
 const API_URL=process.env.EXPO_PUBLIC_API_URL;
  const { categoryId } = useLocalSearchParams();
  const [animals, setAnimals] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    if (categoryId) {
      axios
        .get(`${API_URL}/api/animals/category/${categoryId}`)
        .then((res) => setAnimals(res.data))
        .catch((err) => console.error("Animal fetch error:", err));
    }
  }, [categoryId]);

 useLayoutEffect(() => {
  if (categoryId) {
    axios
      .get(`${API_URL}/api/animalcategory/${categoryId}`)
      .then((res) => {
        const name =
          res.data.category.charAt(0).toUpperCase() + res.data.category.slice(1);
        setCategoryName(name);
        navigation.setOptions({
          title: name,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
            color: "#666600",
          },
        });
      })
      .catch((err) => console.error("Category fetch error:", err));
  }
}, [categoryId, navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={styles.container}>
        <FlatList
          data={animals}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <Pressable
              style={styles.itemColumn}
              onPress={() =>
                router.push(`/(animals)/animal-details/${item._id}`)
              }
            >
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: `${API_URL}/uploads/${item.images[0]}` }}
                  style={styles.imageLarge}
                />
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>
                    {item.animalname.charAt(0).toUpperCase() +
                      item.animalname.slice(1)}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
          ListEmptyComponent={<Text>No animals found.</Text>}
        />
      </View>
       <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "black" }} />
    </View>
  );
};

export default AnimalList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffe6cc",
  },
  row: {
    justifyContent: "space-between",
  },
  itemColumn: {
    flex: 1,
    margin: 6,
    borderRadius: 10,
    overflow: "hidden",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    overflow: "hidden",
     borderWidth: 1,
    borderColor: "#00ff00",
  },
  imageLarge: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 6,
    alignItems: "center",
  },
  overlayText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
});
