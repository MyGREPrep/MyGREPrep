import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { BACKEND_URL } from "../constants";

const Leaderboard = () => {
  const [mockTestScores, setMockTestScores] = React.useState([]);

  React.useEffect(() => {
    // API call to fetch topics
    fetch(`${BACKEND_URL}/leaderboard/fetch-scores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMockTestScores(data.payload.mockTestScores);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  }, []);

  const renderItem = ({ item, index }) => {
    console.log(item.name);
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.rank}>{index + 1}</Text>
        <Text style={styles.username}>{item.name}</Text>
        <Text style={styles.score}>{item.score}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      {mockTestScores.length != 0 ? (
        <FlatList
          data={mockTestScores}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 24,
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rank: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
  },
  score: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Leaderboard;
