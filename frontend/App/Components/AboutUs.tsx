import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ultrices tortor. Integer euismod nisl id erat finibus, et dictum mi ullamcorper. Nullam euismod augue ut tincidunt bibendum. Suspendisse semper elit vel erat iaculis, vel sagittis urna sagittis. Duis cursus placerat mauris, sed auctor odio. In hac habitasse platea dictumst.
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
