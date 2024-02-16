// App.js//
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PhotoUploader from './PhotoUploader';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Photo Uploader</Text>
      <PhotoUploader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
