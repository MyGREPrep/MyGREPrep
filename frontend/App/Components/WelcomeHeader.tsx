import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  useNavigation,
  CommonActions,
  DrawerActions,
} from "@react-navigation/core";
import { auth } from "../../firebase";
import { Ionicons } from "@expo/vector-icons";

export default function WelcomeHeader() {
  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContent}>
        {auth.currentUser !== null ? (
          <TouchableOpacity onPress={toggleDrawer}>
            <View style={styles.burgerIcon}>
              <Ionicons name="ios-menu" size={30} color="white" />
            </View>
          </TouchableOpacity>
        ) : (
          ""
        )}
        <Text style={styles.leftText}>MyGRE-Prep</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0782F9",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginTop:-18
  },
  leftText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    alignItems:"center",
    marginLeft:18
    
  },
  rightText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "30%",
    padding: 4,
    borderRadius: 10,
    alignItems: "center",
  },
  burgerIcon: {
    marginLeft: 10,
  },
});
