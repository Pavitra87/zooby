import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import { Audio } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Slider from "@react-native-community/slider";

const Song = () => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const { songList, index } = useLocalSearchParams();
  const parsedList = JSON.parse(songList || "[]");
  const [currentIndex, setCurrentIndex] = useState(Number(index || 0));
  const [song, setSong] = useState(null);
  const [soundObject, setSoundObject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const navigation = useNavigation();
  const progressInterval = useRef(null);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  const fetchSong = async () => {
    const currentId = parsedList[currentIndex];
    if (!currentId) return;

    try {
      const res = await axios.get(`${API_URL}/api/songs/${currentId}`);
      setSong(res.data);
      setLoading(false);
      const audioPath = res.data.audioFile.startsWith("http")
        ? res.data.audioFile
        : `${API_URL}/uploads/${res.data.audioFile}`;

      console.log("Audio URL:", audioPath);

      await loadSound(audioPath);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to load song");
      setLoading(false);
    }
  };

  const loadSound = async (url) => {
    if (soundObject) {
      await soundObject.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );

    setSoundObject(sound);
    setIsPlaying(true);
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded && status.durationMillis) {
      setProgress(status.positionMillis);
      setDuration(status.durationMillis);
    }
    // Optional: Auto-play next song
    if (status.didJustFinish) {
      goToNext();
    }
  };

  const handleSeek = async (value) => {
    if (soundObject && duration) {
      await soundObject.setPositionAsync(value);
    }
  };

  const togglePlayPause = async () => {
    if (!soundObject) return;

    const status = await soundObject.getStatusAsync();

    if (status.isPlaying) {
      await soundObject.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundObject.playAsync();
      setIsPlaying(true);
    }
  };

  const goToNext = () => {
    if (currentIndex < parsedList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setLoading(true);
      setProgress(0);
    } else {
      Alert.alert("End", "You reached the last song.");
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setLoading(true);
      setProgress(0);
    } else {
      Alert.alert("Start", "You are on the first song.");
    }
  };

  useEffect(() => {
    fetchSong();

    return () => {
      if (soundObject) soundObject.unloadAsync();
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [currentIndex]);

  useLayoutEffect(() => {
    if (song?.title) {
      const songname = song.title.charAt(0).toUpperCase() + song.title.slice(1);

      navigation.setOptions({
        title: songname,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 27,
          color: "#666600",
        },
      });
    }
  }, [navigation, song]);

  if (loading)
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#3399ff" />
    );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/images/kidsbg2.png")}
        style={styles.imageBackground}
      >
        {/* Playback Controls */}
        <View style={styles.controlsWrapper}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={progress}
            onSlidingComplete={handleSeek}
            minimumTrackTintColor="#00cc00"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#00cc00"
          />

          <View style={styles.footer}>
            <Pressable style={styles.button} onPress={goToPrevious}>
              <AntDesign name="stepbackward" size={24} color="black" />
            </Pressable>

            <Pressable style={styles.button} onPress={togglePlayPause}>
              <AntDesign
                name={isPlaying ? "pausecircleo" : "playcircleo"}
                size={30}
                color="black"
              />
            </Pressable>

            <Pressable style={styles.button} onPress={goToNext}>
              <AntDesign name="stepforward" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </ImageBackground>
      <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "black" }} />
    </View>
  );
};

export default Song;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  controlsWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    paddingHorizontal: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    paddingVertical: 12,
  },
  button: {
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 100,
    elevation: 4,
  },
});
