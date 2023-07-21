import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BACKEND_URL } from "../constants";
import { useEmail } from "../state/useEmail";
import { useRewards } from "../state/useRewards";

const Rewards = () => {
  const [rewards, setRewards] = React.useState<number | null>(null);
  const email = useEmail((state) => state.email);
  const addRewards = useRewards((state) => state.addRewards);

  React.useEffect(() => {
    // API call to fetch rewards
    fetch(`${BACKEND_URL}/rewards/get-rewards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("first: ", data.payload.reward);
        setRewards(data.payload.reward);
        addRewards(data.payload.reward);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  }, [email]);

  const handleRefreshRewards = () => {
    // API call to fetch rewards
    fetch(`${BACKEND_URL}/rewards/get-rewards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("second: ", data.payload.reward);
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
      {email ? <Text style={styles.description}>Hey, {email}</Text> : null}
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
