/**
 * @format
 */
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import App from "./App";
import { registerRootComponent } from "expo";

AppRegistry.registerComponent("MyGREPrep", () => App);

registerRootComponent(App);
