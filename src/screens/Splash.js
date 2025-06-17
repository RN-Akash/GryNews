import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Splash({ navigation }) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GRYNEWS</Text>
      <Text style={styles.subtitle}>
        design & developed by Akash Kumar
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 2,
  },
  subtitle: {
    position: 'absolute',
    bottom: 40,
    fontSize: 14,
    color: '#888',
  },
});
