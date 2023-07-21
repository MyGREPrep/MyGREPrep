import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BACKEND_URL } from "../constants";
import { auth } from "../../firebase";
import { useRewards } from "../state/useRewards";
import { useNavigation } from "@react-navigation/native";

const Tips = () => {
  const rewardsState = useRewards((state) => state.rewards);
  const addRewards = useRewards((state) => state.addRewards);
  const [rewards, setRewards] = React.useState<number | null>(null);
  const navigation = useNavigation();
  React.useEffect(() => {
    // API call to fetch rewards
    fetch(`${BACKEND_URL}/rewards/get-rewards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: auth.currentUser.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // setRewards(data.payload.reward);
        addRewards(parseInt(data.payload.reward));
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  }, [rewardsState]);

  return (
    <>
      {rewardsState >= 150 ? (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <Text style={styles.mainTitle}>Tips</Text>
            <Text style={styles.title}>Tip1: Five-choice multiple choice</Text>
            <Text style={styles.description}>
              Answer the question that’s being asked: This might seem obvious,
              but you need to answer the question that’s actually being asked.
              Pay close attention to words like “not” and “except,” and to the
              units or format your answer needs to be in. This will help prevent
              you from making silly mistakes. The GRE anticipates students
              misreading the questions and often puts in dummy answers to trick
              you!
            </Text>
            <Text style={styles.title}>Tip 2: Algebra – Solving for x</Text>
            <Text style={styles.description}>
              {" "}
              Over and over on the GRE Quantitative section, you’ll be asked to
              isolate a variable. This may mean finding the value of a variable,
              such as x = 4 or y {">"} –1, or it may mean solving for one
              variable in terms of another, such as a = 2b2c. Here is a useful
              set of steps for solving most linear equations or inequalities for
              a variable: 1. Eliminate any fractions by multiplying both sides
              by the least common denominator. 2. Put all terms with the
              variable you’re solving for on one side by adding or subtracting
              on both sides. 3. Combine like terms. 4. Factor out the desired
              variable. 5. Divide to leave the desired variable by itself.
              Example: Solve for x in terms of y.
            </Text>
            <Text style={styles.title}>Tip 3: Tackle Multiple Blanks</Text>
            <Text style={styles.description}>
              GRE Text Completion questions can require you to fill in one, two,
              or three blanks with the correct word—and there’s no partial
              credit! However, multiple-blank questions aren’t necessarily more
              difficult than one-blank questions. These sentences often contain
              more context clues to help you predict the type of words needed.
              Moreover, when you fill in one blank correctly, that word is often
              a clue to the remaining word(s). Remember that with multiple-blank
              Text Completions, you do not need to tackle the blanks in order;
              start with the blank that is easiest.
            </Text>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Opps!</Text>
          <Text style={styles.description}>
            Sorry, you do not have enough reward points to access this page.
            Please complete more videos to gain more reward points.
          </Text>
          <TouchableOpacity
            onPress={() => {
              console.log("Pressed");
              fetch(`${BACKEND_URL}/rewards/get-rewards`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userEmail: auth.currentUser.email,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  // setRewards(data.payload.reward);
                  addRewards(parseInt(data.payload.reward));
                })
                .catch((error) => {
                  console.error("Error fetching topics:", error);
                });
              navigation.goBack();
            }}
            style={{
              backgroundColor: "#0782F9",
              width: "70%",
              padding: 15,
              borderRadius: 10,
              alignItems: "center",
              marginTop: 35,
              borderColor: "#0782F9",
              borderWidth: 2,
            }}
          >
            <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  container: {
    //flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
  },
});

export default Tips;
