import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const IssueSection = () => {
  const [capturedImage, setCapturedImage] = useState(null);

  const handleButtonPress = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        console.log('Camera permission not granted');
        return;
      }

      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1.0,
      };

      const result = await ImagePicker.launchCameraAsync(options);

      if (!result.canceled) {
        if ('uri' in result) {
          console.log('Image URI:', result.uri);
          setCapturedImage(result.uri);
        } else {
          console.log('Image picker result does not contain URI.');
        }
      } else {
        console.log('Image picker cancelled');
      }
    } catch (error) {
      console.error('Error opening camera:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Issue Section</Text>
      <Text style={styles.description}>
        Write a response in which you discuss the extent to which you agree or disagree with the recommendation and explain your reasoning for the position you take. In developing and supporting your position, describe specific circumstances in which adopting the recommendation would or would not be advantageous and explain how these examples shape your position.
      </Text>
      <Text style={styles.description}>
        {"\n"}
        Question 1: Government should offer college and university education free of charge to all students.
      </Text>
      <Text style={styles.description}>
        {"\n"}
        Question 2: Teachers' salaries should be based on their students' academic performance.
      </Text>
      {/* Add the button component below Question 2 */}
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Upload Essay</Text>
      </TouchableOpacity>
      {capturedImage && <Image source={{ uri: capturedImage }} style={styles.capturedImage} />}
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
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  capturedImage: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default IssueSection;
