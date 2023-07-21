import { CommonActions, useNavigation } from "@react-navigation/core";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { BACKEND_URL } from "../constants";

const SectionDetailsComponent = ({ route }) => {
  const { sectionTitle, sectionDescription, sectionTopics, navigation } =
    route.params;
  const makeFirstCharUppercase = (str: string): string => {
    if (str.length === 0) {
      return str;
    }

    if (str === "readingComprehension") {
      return "Reading Comprehension";
    } else if (str === "textCompletion") {
      return "Text Completion";
    } else if (str === "sentenceEquivalence") {
      return "Sentence Equivalence";
    }

    const firstChar = str.charAt(0).toUpperCase();
    const remainingChars = str.slice(1);

    return firstChar + remainingChars;
  };

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      <Text style={styles.sectionDescription}>{sectionDescription}</Text>
      <View style={{ marginTop: 20 }}>
        {sectionTopics.map((value, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.topic}
              onPress={() => {
                if (value == "Issue Section") {
                  navigation.navigate("IssueSection");
                } else if (value == "Argument Section") {
                  navigation.navigate("ArgumentSection");
                } else {
                  handleButtonPress(value);
                }
              }}
            >
              <View style={styles.textContainer}>
                <Text style={styles.sectionTitle}>
                  {makeFirstCharUppercase(value)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 16,
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
