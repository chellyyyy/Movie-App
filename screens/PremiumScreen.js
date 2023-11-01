import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PremiumScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gói Premium</Text>
      <Text style={styles.package}>Gói 1: Premium Basic</Text>
      <Text style={styles.packageDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        efficitur mi et sapien euismod, eu posuere justo finibus.
      </Text>
      <Text style={styles.package}>Gói 2: Premium Plus</Text>
      <Text style={styles.packageDescription}>
        Duis convallis urna nec elit sollicitudin, in pellentesque ex mattis.
        Nulla facilisi. Integer consequat quam ut orci volutpat volutpat.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  package: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  packageDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default PremiumScreen;
