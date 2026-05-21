import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InfoCard({ title, data }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.data}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2C2C2C',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    color: '#BBBBBB',
    fontSize: 14,
    marginBottom: 4,
  },
  data: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});