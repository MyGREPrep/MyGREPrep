import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Rewards = ({ email }: { email: string }) => {
  const [rewards, setRewards] = React.useState<string>();

  React.useEffect(() => {
    fetch(`/rewards/get-reward?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const rewards = data.payload.rewards;

        setRewards(rewards);
      })
      .catch((error) => {
        console.error("Error fetching rewards:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rewards</Text>
      <Text style={styles.description}>{rewards}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default Rewards;
