import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function NewsDetails() {

  const routee = useNavigation();
  const route = useRoute();
  const { url } = route.params;

  if (!url) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: url }}
          startInLoadingState
          renderLoading={() => <ActivityIndicator style={{ marginTop: 20 }} />}
        />
        <TouchableOpacity style={styles.fab} onPress={() => routee.goBack()}>
          <Image
            source={require('../assets/backArrow.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#3498db',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
});