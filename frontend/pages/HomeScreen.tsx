import { useNavigation, CommonActions } from "@react-navigation/core";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { auth } from "../firebase";
import SectionsScreen from "../App/Components/SectionsScreen";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{ padding: 20 }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Welcome, {auth.currentUser.email}
        </Text>
      </View>
      <SectionsScreen navigation={navigation} />
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
