import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const PremiumSubscription = () => {
  const [isPremiumPurchased, setIsPremiumPurchased] = useState(false);

  const handleBuyPremium = () => {
    // Implement the logic to handle the purchase action here
    // For this example, we will simulate a successful purchase after 2 seconds
    // Replace this with your actual purchase logic.
    setTimeout(() => {
      setIsPremiumPurchased(true);
    }, 2000);
  };

  const showAlert = () => {
    Alert.alert('Purchase Successful', 'You have successfully purchased the premium subscription!', [
      { text: 'OK', onPress: () => setIsPremiumPurchased(false) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Premium Subscription</Text>
      <Text style={styles.description}>Upgrade to premium for exclusive benefits:</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>- Benefit 1: Access to premium content</Text>
        <Text style={styles.bullet}>- Benefit 2: Ad-free experience</Text>
        <Text style={styles.bullet}>- Benefit 3: Priority customer support</Text>
      </View>
      <Button title="Buy Premium" onPress={() => {
        handleBuyPremium();
        showAlert();
      }} />
      {isPremiumPurchased && <Text style={styles.purchaseStatus}>Purchase Successful!</Text>}
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
    marginBottom: 15,
  },
  bulletContainer: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  bullet: {
    fontSize: 16,
    marginBottom: 5,
  },
  purchaseStatus: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default PremiumSubscription;
