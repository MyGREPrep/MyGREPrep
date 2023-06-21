import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AboutUs from "./AboutUs";

const LeftNav = ({ navigation }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.drawerButton}>
        <View style={styles.burgerIcon}>
          <Ionicons name="ios-menu" size={30} color="white" />
        </View>
      </TouchableOpacity>
      {isDrawerOpen && (
        <View style={styles.drawer}>
          <TouchableOpacity onPress={toggleDrawer} style={styles.drawerButton}>
            <Text>Close Drawer</Text>
          </TouchableOpacity>
          <AboutUs/>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  burgerIcon: {
    marginLeft: 10,
  },
  container: {
    flex: 1,
  },
  drawerButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "70%",
    height: "100%",
    backgroundColor: "#f0f0f0",
    zIndex: 1,
    padding: 20,
  },
});

export default LeftNav;
