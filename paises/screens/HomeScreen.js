import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { fetchAllCountries } from '../services/countriesApi';
import SearchBar from '../components/SearchBar';
import CountryCard from '../components/CountryCard';

export default function HomeScreen({ navigation }) {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadCountries = async () => {
    try {
      setError(null);
      const data = await fetchAllCountries();
      setCountries(data);
      setFilteredCountries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCountries(countries);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = countries.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.capital.toLowerCase().includes(query)
      );
      setFilteredCountries(filtered);
    }
  }, [searchQuery, countries]);

  const onRefresh = () => {
    setRefreshing(true);
    loadCountries();
  };

  const handlePressCountry = (country) => {
    navigation.navigate('Detail', { country });
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Cargando países...</Text>
      </View>
    );
  }

  // Dentro de HomeScreen, reemplazar el bloque de error por:

if (error) {
  return (
    <View style={styles.centered}>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity onPress={loadCountries} style={styles.retryButton}>
        <Text style={styles.retryText}>Reintentar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Y agregar estos estilos:
const styles = StyleSheet.create({
  // ... estilos existentes
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Buscar por país o capital..."
      />
      <FlatList
        data={filteredCountries}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <CountryCard country={item} onPress={() => handlePressCountry(item)} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No se encontraron países</Text>
        }
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    marginTop: 12,
    color: '#FFFFFF',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  retryText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  list: {
    paddingBottom: 20,
  },
  emptyText: {
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});