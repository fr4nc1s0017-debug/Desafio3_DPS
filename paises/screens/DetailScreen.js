import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { fetchWeatherByCapital } from '../services/weatherApi';
import WeatherCard from '../components/WeatherCard';
import InfoCard from '../components/InfoCard';

export default function DetailScreen({ route }) {
  const { country } = route.params;
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);

  // Obtener clima
  useEffect(() => {
    const loadWeather = async () => {
      if (!country.capital || country.capital === 'Sin capital') {
        setWeatherError('Esta capital no tiene datos climáticos');
        return;
      }
      setWeatherLoading(true);
      setWeatherError(null);
      try {
        const data = await fetchWeatherByCapital(country.capital);
        if (data) setWeather(data);
      } catch (err) {
        setWeatherError(err.message);
      } finally {
        setWeatherLoading(false);
      }
    };
    loadWeather();
  }, [country.capital]);

  // Configurar región del mapa si existen coordenadas
  useEffect(() => {
    if (country.coords && country.coords.length === 2) {
      setMapRegion({
        latitude: country.coords[0],
        longitude: country.coords[1],
        latitudeDelta: 5,
        longitudeDelta: 5,
      });
    }
  }, [country.coords]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Nombre y capital */}
      <InfoCard title="País" data={country.name} />
      <InfoCard title="Capital" data={country.capital} />

      {/* Mapa interactivo */}
      <View style={styles.mapContainer}>
        <Text style={styles.sectionTitle}>📍 Ubicación de la capital</Text>
        {country.coords ? (
          <MapView
            style={styles.map}
            region={mapRegion}
            showsUserLocation={false}
            zoomEnabled={true}
          >
            <Marker
              coordinate={{
                latitude: country.coords[0],
                longitude: country.coords[1],
              }}
              title={country.capital}
              description={country.name}
            />
          </MapView>
        ) : (
          <View style={styles.noMap}>
            <Text style={styles.noMapText}>
              No hay coordenadas disponibles para esta capital.
            </Text>
          </View>
        )}
      </View>

      {/* Clima actual */}
      <View style={styles.weatherSection}>
        <Text style={styles.sectionTitle}>🌤️ Clima actual en {country.capital}</Text>
        <WeatherCard
          weather={weather}
          loading={weatherLoading}
          error={weatherError}
        />
      </View>

      {/* Información adicional del país (extra) */}
      <InfoCard title="Región" data={country.region || 'N/A'} />
      <InfoCard title="Subregión" data={country.subregion || 'N/A'} />
      <InfoCard title="Población" data={country.population?.toLocaleString() || 'N/A'} />
      <InfoCard title="Moneda(s)" data={country.currencies} />
      <InfoCard title="Idiomas" data={country.languages} />
    </ScrollView>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  mapContainer: {
    marginBottom: 24,
  },
  map: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
  },
  noMap: {
    backgroundColor: '#2C2C2C',
    borderRadius: 16,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMapText: {
    color: '#AAAAAA',
    textAlign: 'center',
  },
  weatherSection: {
    marginBottom: 16,
  },
});