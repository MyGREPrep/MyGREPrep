import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
} from "react-native";
import { BACKEND_URL, COLORS, SIZES } from "../constants";
import data from "../QuizData/RatioQuiz";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  CommonActions,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
import { auth } from "../../firebase";
import NoRewards from "./NoRewards";

const CompleteMockTest = ({ route }) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetchQuestionsFromAPI()
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const fetchQuestionsFromAPI = async () => {
    // Fetch questions from API endpoint
    const response = await fetch(`${BACKEND_URL}/question/generate-mock-test`);
    const data = await response.json();
    return data.payload.questions;
  };
  const allQuestions = questions;
  const navigation = useNavigation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [rewards, setRewards] = React.useState<number | null>(null);

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
        console.log("Rewards",rewards)
        setRewards(data.payload.reward);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  },[]);
  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex]["correctOption"];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
      // Set Score
      setScore(score + 1);
    }
    // Show Next Button
    setShowNextButton(true);
  };
  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const handleRemoveRewards = () => {
    fetch(`${BACKEND_URL}/rewards/remove-rewards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: auth.currentUser.email, points: 150 }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Removed test reward", data);
      })
      .catch((error) => {
        console.error("Error removing rewards:", error);
      });
  };
  const restartQuiz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 40,
        }}
      >
        {/* Question Counter */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              color: COLORS.black,
              fontSize: 20,
              opacity: 0.6,
              marginRight: 2,
            }}
          >
            {currentQuestionIndex + 1}
          </Text>
          <Text style={{ color: COLORS.black, fontSize: 18, opacity: 0.6 }}>
            / {allQuestions.length}
          </Text>
        </View>

        {/* Question */}
        <Text
          style={{
            color: COLORS.black,
            fontSize: 30,
          }}
        >
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };
  const renderOptions = () => {
    return (
      <View>
        {allQuestions[currentQuestionIndex]?.options.map((option) => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            disabled={isOptionsDisabled}
            key={option}
            style={{
              borderWidth: 3,
              borderColor:
                option == correctOption
                  ? COLORS.success
                  : option == currentOptionSelected
                  ? COLORS.error
                  : COLORS.secondary + "40",
              backgroundColor:
                option == correctOption
                  ? COLORS.success + "20"
                  : option == currentOptionSelected
                  ? COLORS.error + "20"
                  : COLORS.secondary + "20",
              height: 60,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: COLORS.black }}>{option}</Text>

            {/* Show Check Or Cross Icon based on correct answer*/}
            {option == correctOption ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLORS.success,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="check"
                  style={{
                    color: COLORS.black,
                    fontSize: 20,
                  }}
                />
              </View>
            ) : option == currentOptionSelected ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: COLORS.error,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="close"
                  style={{
                    color: COLORS.black,
                    fontSize: 20,
                  }}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: "#0782F9",
            width: "100%",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 20,
            borderColor: "#0782F9",
            borderWidth: 2,
          }}
        >
          <Text
            style={{ fontSize: 20, color: COLORS.white, textAlign: "center" }}
          >
            Next
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 20,
          borderRadius: 20,
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: COLORS.primary,
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  return (
    <>
      {rewards > 150 ? (
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor={COLORS.primary}
          />
          <View
            style={{
              flex: 1,
              paddingVertical: 40,
              paddingHorizontal: 16,

              position: "relative",
            }}
          >
            {/* ProgressBar */}
            {renderProgressBar()}

            {/* Question */}
            {renderQuestion()}

            {/* Options */}
            {renderOptions()}

            {/* Next Button */}
            {renderNextButton()}

            {/* Score Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={showScoreModal}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: COLORS.primary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    width: "90%",
                    borderRadius: 20,
                    padding: 20,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                    {score > allQuestions.length / 2
                      ? "Congratulations!"
                      : "Oops!"}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginVertical: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        color:
                          score > allQuestions.length / 2
                            ? COLORS.success
                            : COLORS.error,
                      }}
                    >
                      {score}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        color: COLORS.black,
                        paddingLeft: 8,
                      }}
                    >
                      / {allQuestions.length}
                    </Text>
                  </View>
                  {/* Retry Quiz button */}
                  {rewards < 150 ? (
                    <TouchableOpacity
                      onPress={restartQuiz}
                      style={{
                        backgroundColor: "#0782F9",
                        width: "100%",
                        padding: 15,
                        borderRadius: 10,
                        alignItems: "center",
                        marginTop: 5,
                        borderColor: "#0782F9",
                        borderWidth: 2,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "700",
                          fontSize: 16,
                        }}
                      >
                        Retry
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    ""
                  )}

                  <TouchableOpacity
                    onPress={() => {
                      handleRemoveRewards();
                      setShowScoreModal(false);
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: "MyGREPrep" }],
                        })
                      );
                    }}
                    style={{
                      backgroundColor: "#0782F9",
                      width: "100%",
                      padding: 15,
                      borderRadius: 10,
                      alignItems: "center",
                      marginTop: 25,
                      borderColor: "#0782F9",
                      borderWidth: 2,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "400",
                        fontSize: 16,
                      }}
                    >
                      Go Back
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
      ) : (
        <NoRewards />
      )}
    </>
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

export default CompleteMockTest;
