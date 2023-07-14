import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const MockTestLandingPage = () => {
  const navigation = useNavigation();
  
  return (
    <View style={{ margin: 18 }}>
      <Text style={styles.description}>
        {"Start Complete Mock Test"}
      </Text>
      <TouchableOpacity
        style={styles.startQuizButton}
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "CompleteMockTest" }],
            })
          );
        }}
      >
        <Text style={styles.startQuizButtonText}>Start Mock Test</Text>
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

export default MockTestLandingPage;
