import { CommonActions, useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import SnackBar from "react-native-snackbar-component";
import { BACKEND_URL } from "../constants";
import { useOtp } from "../state/useOtp";

const NewPassword = () => {
  const otp = useOtp((state) => state.otp);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrorMsg] = useState("");
  const navigation = useNavigation();

  const handleChangePassword = () => {
    if (password !== "" && password === confirmPassword) {
      fetch(`${BACKEND_URL}/user/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: otp, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          if (data.status) {
            setSuccess(true);
            // TODO: update firebase store here -> @luqmaan
            // Navigate to Verify OTP screen
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "VerifyOTP" }],
              })
            );
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert("Error", "An error occurred. Please try again later.");
        });
    } else if (password === "" && confirmPassword === "") {
      setError(true);
      setErrorMsg("Password cannot be empty");
    } else {
      // Passwords do not match, show an error message or take appropriate action
      setError(true);
      setErrorMsg("Passwords do not match!");
    }
  };
  console.log("ERR", errMsg);
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
          textMessage={errMsg}
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
