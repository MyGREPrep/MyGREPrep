import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeHeader from "../Components/WelcomeHeader";
import Login from "./Login";
import HomeScreen from "./HomeScreen";
import ForgetPassword from "./ForgetPassword";
import VerifyOTP from "../Components/VerifyOTP";
import NewPassword from "../Components/NewPassword";
import SectionsScreen from "../Components/SectionsScreen";
import SectionDetailsComponent from "../Components/SectionDetailsComponent";
import TopicDetails from "../Components/TopicDetails";
import Quiz from "../Components/Quiz";

function AuthStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          header: () => <WelcomeHeader />,
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          header: () => <WelcomeHeader />,
        }}
      />
      <Stack.Screen
        name="VerifyOTP"
        component={VerifyOTP}
        options={{
          header: () => <WelcomeHeader />,
        }}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{
          header: () => <WelcomeHeader />,
        }}
      />
      <Stack.Screen
        name="Sections"
        component={SectionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SectionDetails"
        component={SectionDetailsComponent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TopicDetails"
        component={TopicDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
