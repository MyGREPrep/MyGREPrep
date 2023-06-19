import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./App/Pages/Login";
import HomeScreen from "./App/Pages/HomeScreen";
import WelcomeHeader from "./App/Components/WelcomeHeader";
import SectionDetailsComponent from "./App/Components/SectionDetailsComponent";
import SectionsScreen from "./App/Components/SectionsScreen";
import ForgetPassword from "./App/Pages/ForgetPassword";
import VerifyOTP from "./App/Components/VerifyOTP";
import NewPassword from "./App/Components/NewPassword";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
          options={{
            header: () => <WelcomeHeader />,
          }}
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
          options={{
            header: () => <WelcomeHeader />,
          }}
        />
        <Stack.Screen
          name="SectionDetails"
          component={SectionDetailsComponent}
          options={{
            header: () => <WelcomeHeader />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
