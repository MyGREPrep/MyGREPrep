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
import { BACKEND_URL } from "../constants";
import SnackBar from "react-native-snackbar-component";
import { useOtp } from "../state/useOtp";

const VerifyOTP = () => {
  const [otp, setOTP] = useState("");
  const addOtp = useOtp((state) => state.addOtp);
  const [otpIsVerified, setOtpIsVerified] = useState(false);
  const [isBadOtp, setIsBadOtp] = useState(false);
  const navigation = useNavigation();

  const handleVerifyOTP = async () => {
    fetch(`${BACKEND_URL}/user/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.status) {
          setOtpIsVerified(true);
          addOtp(otp);
          // Navigate to Verify OTP screen
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "NewPassword" }],
            })
          );
        }

        if (!data.status) {
          setIsBadOtp(true);
        }
      })
      .catch((error) => {
        console.error(error);

        Alert.alert("Error", "An error occurred. Please try again later.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Verify OTP</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={(text) => setOTP(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
          <Text style={styles.buttonText}>Verify</Text>
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

      {otpIsVerified ? (
        <SnackBar
          visible={true}
          textMessage={"Otp is valid and verified!"}
          backgroundColor="#008000"
          // actionHandler={() => {
          //   setError(false);
          // }}
          accentColor="#FFFFFF"
          actionText="okay"
        />
      ) : (
        ""
      )}

      {isBadOtp ? (
        <SnackBar
          visible={true}
          textMessage={"Otp is not valid!"}
          backgroundColor="#FF0000"
          // actionHandler={() => {
          //   setError(false);
          // }}
          accentColor="#FFFFFF"
          actionText="okay"
        />
      ) : (
        ""
      )}
    </View>
  );
};

export default VerifyOTP;

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
