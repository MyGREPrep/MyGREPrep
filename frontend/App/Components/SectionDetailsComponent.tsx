import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SectionDetailsComponent = ({ route }) => {
  const { sectionTitle, sectionDescription } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      <Text style={styles.sectionDescription}>{sectionDescription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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

export default SectionDetailsComponent;
