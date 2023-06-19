import { CommonActions, useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";

const ForgetPassword = ({}) => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleSubmit = () => {
    // Make API call here with the 'email' value
    // Replace 'API_ENDPOINT' with your actual API endpoint
    // fetch("API_ENDPOINT", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    // Handle API response here
    // You can show a success message or navigate to another screen
    // based on the response from the API
    //   console.log(data);
    // })
    // .catch((error) => {
    // Handle error here
    //   console.error(error);
    //   Alert.alert("Error", "An error occurred. Please try again later.");
    // });

    // Navigate to Verify OTP screen
    if (email !== "") {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "VerifyOTP" }],
        })
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.sectionTitle}>
        Enter your email to reset your password
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email.trim()}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
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
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 18,
  },
});

export default ForgetPassword;
