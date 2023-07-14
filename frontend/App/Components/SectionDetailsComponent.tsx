import { CommonActions, useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BACKEND_URL } from "../constants";

const SectionDetailsComponent = ({ route }) => {
  const { sectionTitle, sectionDescription, sectionTopics, navigation } =
    route.params;

  const handleButtonPress = (topic) => {
    // API call to fetch topics
    fetch(`${BACKEND_URL}/topic/get-topic?topic=${topic}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Process the fetched topics

        // Navigate to a different screen
        navigation.navigate("TopicDetails", {
          topics: data.payload.topic,
          navigation: navigation,
        });
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      <Text style={styles.sectionDescription}>{sectionDescription}</Text>
      <View style={{ marginTop: 20 }}>
        {sectionTopics.map((value, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.topic}
              onPress={
                () => handleButtonPress(value)
                // navigation.navigate("TopicDetails", {
                //   topicId: 1,
                //   topicDescription: "Loren Ipsum",
                //   topicSignificance: "high",
                //   topicVideo: "www.URL.com",
                //   navigation: navigation,
                // })
              }
            >
              <View style={styles.textContainer}>
                <Text style={styles.sectionTitle}>{value}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    color: "#333",
  },
  topic: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    padding: 24,
    width: "60%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  textContainer: {
    flex: 1,
  },
});

export default SectionDetailsComponent;
