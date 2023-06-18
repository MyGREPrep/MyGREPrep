import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './App/Pages/Home';
import CourseDetails from './App/Pages/CourseDetails';
import CourseChapter from './App/Pages/CourseChapter';
import PlayVideo from './App/Pages/PlayVideo';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
export default function HomeNavigation() {
  return (
     <NavigationContainer>

    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="home" component={Home} ></Stack.Screen>
        <Stack.Screen name="courseDetail" component={CourseDetails} ></Stack.Screen>
        <Stack.Screen name="courseChapter"
        component={CourseChapter}/>
         <Stack.Screen name="playVideo"
        component={PlayVideo}/>
    </Stack.Navigator>      
     </NavigationContainer>
  )
}