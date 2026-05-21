import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

export default function SearchBar({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1E1E1E',
  },
  input: {
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
});