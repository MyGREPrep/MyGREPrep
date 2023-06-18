import { useNavigation, CommonActions } from "@react-navigation/core";
import React from "react";
import {
  ScrollView,
  Slider,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";

import CourseList from "./App/Components/CourseList";
import VideoCourseList from "./App/Components/VideoCourseList";
import SearchBar from "./App/Components/SearchBar";

const HomeScreen = () => {
  return (
    <ScrollView style={{ padding: 20 }}>
      <View>

         <Text style={{fontSize:20,fontWeight:'bold'}}>Welcome, {auth.currentUser.email}</Text>
        </View>

      <SearchBar />
      <VideoCourseList />
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
