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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [msg, setMsg] = useState("");

  const navigation = useNavigation();
  const icon = require("./../Assets/Images/mygreprep.jpeg");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        );
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log("Registered with:", userCredentials);
      if (user.email !== undefined) {
        console.log("Call to API");
        //call to our api
      }
    } catch (err) {
      setError(true);
      setMsg(err);
      console.log("Error with sign up", err);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log("Logged in with:", userCredentials);
    } catch (err) {
      setLoginError(true);
      console.log("Error with login", err);
    }
  };

  const handleForgetPassword = async () => {
    try {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "ForgetPassword" }],
        })
      );
    } catch (err) {
      console.log("Forgot password navigation error", err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.iconContainer}>
        <Image source={icon} />
      </View>

      <View style={styles.inputContainer}>
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
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <View style={styles.forgetButtonContainer}>
          <TouchableOpacity
            onPress={handleForgetPassword}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>

      {error ? (
        <SnackBar
          visible={true}
          textMessage={"Sign up error"}
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
      {loginError ? (
        <SnackBar
          visible={true}
          textMessage={"Login Error, please check your credentials"}
          backgroundColor="#FF0000"
          actionHandler={() => {
            setLoginError(false);
          }}
          accentColor="#FFFFFF"
          actionText="okay"
        />
      ) : (
        ""
      )}
    </KeyboardAvoidingView>
  );
};

export default Login;

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
  forgetButtonContainer: {
    alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "flex-end",
  },
  iconContainer: {
    marginBottom: 44,
  },
});
