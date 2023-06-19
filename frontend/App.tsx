import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./pages/Login";
import HomeScreen from "./pages/HomeScreen";
import WelcomeHeader from "./App/Components/WelcomeHeader";
import SectionDetailsComponent from "./App/Components/SectionDetailsComponent";
import SectionsScreen from "./App/Components/SectionsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
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
        <Stack.Screen name="Sections" component={SectionsScreen} />
        <Stack.Screen
          name="SectionDetails"
          component={SectionDetailsComponent}
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
