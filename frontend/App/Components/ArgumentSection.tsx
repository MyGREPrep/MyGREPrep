import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ArgumentSection = () => {
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
      <Text style={styles.title}>Argument Section 
      </Text>
      <Text style={styles.description}>
      Write a response in which you examine the stated and/or unstated assumptions of the argument. Be sure to explain how the argument depends on the assumptions and what the implications are if the assumptions prove unwarranted.
      {"\n"}{"\n"}
        Question
        {"\n"}SuperCorp recently moved its headquarters to Corporateville. The recent surge in the number of homeowners in Corporateville prove that Corporateville is a superior place to live then Middlesburg, the home of SuperCorp’s current headquarters. Moreover, Middleburg is a predominately urban area and according to an employee survey, SuperCorp has determined that its workers prefer to live in an area that is not urban. Finally, Corporateville has lower taxes than Middlesburg, making it not only a safer place to work but also a cheaper one. Therefore, Supercorp clearly made the best decision.
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

export default ArgumentSection;
