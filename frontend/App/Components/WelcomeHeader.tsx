import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation, CommonActions } from "@react-navigation/core";
import { auth } from "../../firebase";

export default function WelcomeHeader() {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      })
      .catch((error) => alert(error.message));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={styles.leftText}>MyGRE-Prep</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        {auth.currentUser !== null ? <Text style={styles.rightText}>Sign Out</Text>:''}
        </TouchableOpacity>
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
  },
  leftText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
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
  }
});
