import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AboutUs from "./App/Components/AboutUs";
import { auth } from "./firebase";
import WelcomeHeader from "./App/Components/WelcomeHeader";
import { Ionicons } from "@expo/vector-icons";
import Rewards from "./App/Components/Rewards";
import DrawerContent from "./App/Components/DrawerContent";
import AuthStack from "./App/Pages/AuthStack";
import LeaderBoard from "./App/Components/Leaderboard";
import Board from "./App/Components/Leaderboard";
import MockTest from "./App/Components/MockTestLandingPage";
import CompleteMockTest from "./App/Components/CompleteMockTest";
import MockTestLandingPage from "./App/Components/MockTestLandingPage";

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          drawerActiveBackgroundColor: "#0782F9",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#333",
          drawerLabelStyle: {
            fontSize: 15,
          },
        }}
      >
        <Drawer.Screen
          name="MyGREPrep"
          component={AuthStack}
          options={{
            header: () => (auth.currentUser !== null ? <WelcomeHeader /> : ""),
          }}
        />
        <Drawer.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            header: () => <WelcomeHeader />,
          }}
        />
        <Drawer.Screen
          name="Leaderboard"
          component={LeaderBoard}
          options={{
            header: () => <WelcomeHeader />,
          }}
        />
        <Drawer.Screen
          name="Rewards"
          component={Rewards}
          options={{
            header: () => <WelcomeHeader />,
          }}
        />
        <Drawer.Screen
          name="Mock Test"
          component={CompleteMockTest}
          options={{
            header: () => (<WelcomeHeader />),
          }}
        />
      </Drawer.Navigator>
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
