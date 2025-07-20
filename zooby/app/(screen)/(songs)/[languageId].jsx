import { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";



const SongList = () => {
   const { languageId } = useLocalSearchParams();
   const API_URL=process.env.EXPO_PUBLIC_API_URL;
  const [songs, setSongs] = useState([]);
  const [songCategoryName, setSongCategoryName] = useState("");
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    if (languageId) {
      axios
        .get(`${API_URL}/api/songs/language/${languageId}`)
        .then((res) => setSongs(res.data))
        .catch((err) => console.error("Song fetch error:", err));
    }
  }, [languageId]);

  useLayoutEffect(() => {
    if (languageId) {
      axios
        .get(`${API_URL}/api/songcategory/${languageId}`)
        .then((res) => {
          const name =
            res.data.language.charAt(0).toUpperCase() +
            res.data.language.slice(1);
          setSongCategoryName(name);
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
        .catch((err) => console.error("songcategoryfetch error:", err));
    }
  }, [languageId, navigation]);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <FlatList
          data={songs}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item ,index}) => (
            <Pressable
              style={styles.itemColumn}
              onPress={() =>
                router.push({
                  pathname: "/(songs)/song/[songId]",
                  params: {
                    songId: item._id,
                    index: index.toString(),
                    songList: JSON.stringify(songs.map((s) => s._id)),
                  },
                })
              }
            >
              <View style={styles.imageWrapper}>
                <AntDesign name="sound" size={40} color="#333" />
                <Text style={styles.songTitle} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
            </Pressable>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No songs found.</Text>
          }
        />
      </View>
      <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "black" }} />
    </View>
  );
};

export default SongList;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#ffe6cc",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 14,
  },
  itemColumn: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6ffe6",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccffcc",
  },
  songTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 8,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 6,
    alignItems: "center",
  },
  overlayText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  emptyText: {
    textAlign: "center",
    color: "#333",
    marginTop: 40,
    fontSize: 18,
  },
});
