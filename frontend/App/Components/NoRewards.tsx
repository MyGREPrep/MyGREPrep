import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const NoRewards = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Opps!</Text>
      <Text style={styles.description}>
        Sorry, you do not have enough reward points to access this page. Please
        complete more videos to gain more reward points.
      </Text>
      <TouchableOpacity
        onPress={() => {
          console.log("Pressed");

          navigation.goBack();
        }}
        style={{
          backgroundColor: "#0782F9",
          width: "70%",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 35,
          borderColor: "#0782F9",
          borderWidth: 2,
        }}
      >
        <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default NoRewards;
