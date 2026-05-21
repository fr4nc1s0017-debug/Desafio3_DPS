import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

export default function WeatherCard({ weather, loading, error }) {
  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Cargando clima...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.card}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!weather) return null;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png` }}
          style={styles.icon}
        />
        <Text style={styles.temp}>{weather.temp}°C</Text>
      </View>
      <Text style={styles.condition}>{weather.condition}</Text>
      <View style={styles.details}>
        <Text style={styles.detail}>💧 Humedad: {weather.humidity}%</Text>
        <Text style={styles.detail}>💨 Viento: {weather.windSpeed} m/s</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2C2C2C',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 60,
    height: 60,
  },
  temp: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  condition: {
    fontSize: 18,
    color: '#DDDDDD',
    marginVertical: 8,
    textTransform: 'capitalize',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detail: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  loadingText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
  },
  errorText: {
    color: '#FF6B6B',
    textAlign: 'center',
  },
});