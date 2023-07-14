import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

const SectionsScreen = ({ navigation }) => {
  const sections = [
    {
      id: "1",
      title: "Verbal Reasoning",
      description:
        "Assesses your ability to analyze and evaluate written material and synthesize information obtained from it.",
      icon: require("../Assets/Images/idea.png"),
      topics: ["English", "Learn"],
    },
    {
      id: "2",
      title: "Quantitative Reasoning",
      description:
        "Tests your understanding of basic concepts of arithmetic, algebra, geometry, and data analysis.",
      icon: require("../Assets/Images/calculator.png"),
      topics: ["Algebra", "Arithmetic", "Data Analysis", "Fraction", "Geometry", "Integers", "Ratio", "Percentage"],
    },
    {
      id: "3",
      title: "Analytical Writing",
      description:
        "Measures critical thinking and analytical writing skills, including your ability to articulate complex ideas clearly and effectively.",
      icon: require("../Assets/Images/analytics.png"),
      topics: ["Writing1", "Writing2"],
    },
  ];

  return (
    <View style={styles.container}>
      {sections.map((section) => (
        <TouchableOpacity
          key={section.id}
          style={styles.section}
          onPress={() =>
            navigation.navigate("SectionDetails", {
              sectionTitle: section.title,
              sectionDescription: section.description,
              sectionTopics:section.topics,
              navigation:navigation
            })
          }
        >
          <View style={styles.iconContainer}>
            <Image source={section.icon} style={styles.sectionIcon} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionDescription}>{section.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    padding: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 12,
  },
  sectionIcon: {
    width: 60,
    height: 60,
  },
  textContainer: {
    flex: 1,
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
});

export default SectionsScreen;
