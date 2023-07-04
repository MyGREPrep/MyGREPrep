import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
      Welcome to MyGREPrep! We understand the challenges and complexities of preparing for the GRE and believe that with the right guidance, tools, and support, anyone can excel in this crucial exam. We have dedicated our collective knowledge, expertise, and research into developing a user-friendly and effective learning app that covers all aspects of the GRE exam. The app provides a great learning experience with its comprehensive study resources and practice problems. Whether you're a busy professional, a full-time student, or someone juggling multiple responsibilities, our app is tailored to fit seamlessly into your lifestyle and help you make the most of your study time. Join us on this transformative learning journey and unlock your true potential.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AboutUs;
