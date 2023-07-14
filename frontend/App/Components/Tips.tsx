import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tips = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tips</Text>
      <Text style={styles.title}>five-choice multiple choice</Text>
      <Text style={styles.description}>
       Answer the question that’s being asked: 
       
       This might seem obvious, but you need to answer the question that’s actually being asked. 
       
       Pay close attention to words like “not” and “except,” and to the units or format your answer needs to be in. 
       
       This will help prevent you from making silly mistakes. The GRE anticipates students misreading the questions and often puts in dummy answers to trick you!
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
    textAlign: 'justify',
  },
});

export default Tips;
