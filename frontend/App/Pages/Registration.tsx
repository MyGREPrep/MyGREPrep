import { useNavigation, CommonActions } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { auth } from "../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import SnackBar from "react-native-snackbar-component";
import { BACKEND_URL } from "../constants";

const Registration = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<number>();
  const [error, setError] = useState(false);

  const handleRegistration = async () => {
    try {
      
      // Replace 'your-api-endpoint' with the actual endpoint to store user data
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      if (userCredentials) {
        const user = userCredentials.user;
        console.log("Registered with:", userCredentials);

        // Make an API call to store the user data in your database
        const userData = {
          email: user.email,
          name,
          password,
          phoneNumber,
          photoUrl: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
        };
        const response = await fetch(`${BACKEND_URL}/user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        console.log(response);

        if (response.status) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Home" }],
            })
          );
        }
      }

      // Handle the API response 

    } catch (err) {
      setError(true);
      console.log("Error with sign up", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email.trim()}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry
      />
      
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber ? phoneNumber.toString():null}
        onChangeText={(text) => setPhoneNumber(parseInt(text))}
        style={styles.input}
        maxLength={10}
        keyboardType="number-pad"
      />
      <TouchableOpacity onPress={handleRegistration} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>Registration error</Text>}
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
