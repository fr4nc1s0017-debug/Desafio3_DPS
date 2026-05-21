import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

export default function CountryCard({ country, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: country.flag }} style={styles.flag} />
      <View style={styles.info}>
        <Text style={styles.countryName}>{country.name}</Text>
        <Text style={styles.capital}>{country.capital}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#2C2C2C',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  flag: {
    width: 50,
    height: 35,
    borderRadius: 6,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  countryName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  capital: {
    color: '#AAAAAA',
    fontSize: 14,
  },
});