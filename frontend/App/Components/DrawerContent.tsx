import { CommonActions, useNavigation } from "@react-navigation/core";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { auth } from "../../firebase";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { useEmail } from "../state/useEmail";

const DrawerContent = (props) => {
  const navigation = useNavigation();
  const addEmail = useEmail((state) => state.addEmail);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(async () => {
        addEmail(null);
        props.navigation.navigate("Login");
        props.navigation.closeDrawer();
      })
      .catch((error) => alert(error.message));
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sign Out" onPress={handleSignOut} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  signOutButton: {
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
  },
  signOutButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default DrawerContent;
