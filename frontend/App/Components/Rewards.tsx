import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BACKEND_URL } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Rewards = () => {
  const [rewards, setRewards] = React.useState<number | null>(null);
  const [userEmail, setUserEmail] = React.useState<string | null>(null);

  const getEmail = async () => {
    const email = await AsyncStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  };

  React.useEffect(() => {
    getEmail();
  }, []);

  React.useEffect(() => {
    // API call to fetch rewards
    fetch(`${BACKEND_URL}/rewards/get-rewards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRewards(data.payload.reward);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  }, [userEmail]);

  const handleRefreshRewards = () => {
    // API call to fetch rewards
    fetch(`${BACKEND_URL}/rewards/get-rewards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRewards(data.payload.reward);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rewards</Text>
      {rewards ? <Text style={styles.rewardTitle}>{rewards}</Text> : null}
      {userEmail ? (
        <Text style={styles.description}>Hey, {userEmail}</Text>
      ) : null}
      <TouchableOpacity onPress={handleRefreshRewards} style={styles.button}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rewardTitle: {
    fontSize: 150,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
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
});

export default Rewards;
