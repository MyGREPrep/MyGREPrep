import { CommonActions, useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import SnackBar from "react-native-snackbar-component";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigation = useNavigation();

  const handleChangePassword = () => {
    if (password === confirmPassword) {
      // Passwords match, call change password API
      console.log("Password changed successfully!");
      setSuccess(true);
    } else {
      // Passwords do not match, show an error message or take appropriate action
      setError(true);
      console.log("Passwords do not match!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter New passowrd</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
          }}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {error ? (
        <SnackBar
          visible={true}
          textMessage={"Password do not match"}
          backgroundColor="#FF0000"
          actionHandler={() => {
            setError(false);
          }}
          accentColor="#FFFFFF"
          actionText="okay"
        />
      ) : (
        ""
      )}
      {success ? (
        <SnackBar
          visible={true}
          textMessage={"Password changed sucessfully"}
          backgroundColor="#4BB543"
          actionHandler={() => {
            setSuccess(false);
            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                })
              );
          }}
          accentColor="#FFFFFF"
          actionText="okay"
        />
      ) : (
        ""
      )}
    </View>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    backgroundColor: "#0782F9",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
