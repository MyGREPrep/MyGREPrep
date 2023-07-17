import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Quiz from "./Quiz";
import Video from "react-native-video";
import YoutubePlayer from "react-native-youtube-iframe";

function TopicDetails({ route }) {
  const { topics, navigation } = route.params;
  const [playing, setPlaying] = React.useState(false);

  const onStateChange = React.useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const handleStartQuiz = () => {
    navigation.navigate("Quiz", {
      quiz: topics.quiz,
    });
  };

  return (
    <View style={{ margin: 18 }}>
      <Text style={styles.description}>{topics.description}</Text>
      <Text style={styles.significance}>{topics.significance}</Text>
      <View style={styles.videoContainer}>
        <YoutubePlayer
          height={220}
          play={playing}
          videoId="afUJ1H3Df_A"
          onChangeState={onStateChange}
        />
      </View>
      <TouchableOpacity
        style={styles.startQuizButton}
        onPress={handleStartQuiz}
      >
        <Text style={styles.startQuizButtonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  significance: {
    fontSize: 16,
    marginBottom: 10,
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9, // Adjust the aspect ratio as per your video's dimensions
    backgroundColor: "black",
  },
  startQuizButton: {
    backgroundColor: "#0782F9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  startQuizButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default TopicDetails;
