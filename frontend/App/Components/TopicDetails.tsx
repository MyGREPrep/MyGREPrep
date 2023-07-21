import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Quiz from "./Quiz";
import Video from "react-native-video";
import YoutubePlayer from "react-native-youtube-iframe";
import { LogBox } from "react-native";
import { BACKEND_URL } from "../constants";
import { auth } from "../../firebase";
import { setEnabled } from "react-native/Libraries/Performance/Systrace";
import { useRewards } from "../state/useRewards";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

function TopicDetails({ route }) {
  const { topics, navigation } = route.params;
  const [playing, setPlaying] = React.useState(false);
  const [enable, setEnable] = React.useState(false);
  const addRewards = useRewards((state) => state.addRewards);

  const onStateChange = React.useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      handleAddRewards();
      setEnable(true);
    }
  }, []);

  const handleAddRewards = () => {
    fetch(`${BACKEND_URL}/rewards/add-rewards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: auth.currentUser.email, rewards: 20 }),
    })
      .then((response) => response.json())
      .then((data) => {
        addRewards(parseInt(data.payload.reward));
        console.log("Added video reward", data);
      })
      .catch((error) => {
        console.error("Error adding rewards:", error);
      });
  };

  const handleStartQuiz = () => {
    navigation.navigate("Quiz", {
      quiz: topics.quiz,
    });
  };

  console.log("Enable", enable);
  return (
    <View style={{ margin: 18 }}>
      <Text style={styles.text}>Description</Text>
      <Text style={styles.description}>{topics.description}</Text>
      <Text style={styles.text}>Significance</Text>
      <Text style={styles.significance}>
        {topics.significance === "MEDUIM" ? "MEDIUM" : topics.significance}
      </Text>
      <View style={styles.videoContainer}>
        <YoutubePlayer
          height={220}
          play={playing}
          videoId="afUJ1H3Df_A"
          onChangeState={onStateChange}
        />
      </View>
      <TouchableOpacity
        style={enable ? styles.startQuizButton : styles.disableStartQuizButton}
        onPress={handleStartQuiz}
        disabled={!enable}
      >
        <Text style={styles.startQuizButtonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
  significance: {
    fontSize: 18,
    marginBottom: 20,
    marginTop: 10,
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
  disableStartQuizButton: {
    backgroundColor: "#A6A0A0",
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
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default TopicDetails;
