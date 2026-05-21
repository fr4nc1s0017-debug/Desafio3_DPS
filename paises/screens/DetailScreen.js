import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
import InfoCard from "../components/InfoCard";
import MapView, { Marker } from "react-native-maps";

import { useEffect, useState } from "react";

import { getWeather } from "../services/weatherApi";

export default function DetailScreen({ route }) {
  const { country } = route.params;

  const capital = country?.capital?.[0];

  const lat = country?.capitalInfo?.latlng?.[0];
  const lng = country?.capitalInfo?.latlng?.[1];

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      const data = await getWeather(capital);

      setWeather(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (capital) {
      fetchWeather();
    }
  }, []);

  if (!country) {
    return (
      <View style={styles.center}>
        <Text>No hay información</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {country.name?.common}
      </Text>

      <Text style={styles.capital}>
        Capital: {capital}
      </Text>

      {lat && lng && (
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 5,
            longitudeDelta: 5,
          }}
        >
          <Marker
            coordinate={{
              latitude: lat,
              longitude: lng,
            }}
            title={capital}
          />
        </MapView>
      )}

      <InfoCard
        title="Moneda"
        value={
          Object.values(country.currencies || {})[0]
            ?.name || "No disponible"
        }
        icon="💰"
      />

      <InfoCard
        title="Idioma"
        value={
          Object.values(country.languages || {})
            ?.join(", ") || "No disponible"
        }
        icon="🗣"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          Linking.openURL(
            `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
          )
        }
      >
        <Text style={styles.buttonText}>
          Abrir en Google Maps
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : weather ? (
        <View style={styles.weatherBox}>
          <Text>
            🌡 Temperatura: {weather.main?.temp}°C
          </Text>

          <Text>
            ☁ Clima: {weather.weather?.[0]?.description}
          </Text>

          <Text>
            💧 Humedad: {weather.main?.humidity}%
          </Text>

          <Text>
            🌬 Viento: {weather.wind?.speed} m/s
          </Text>
        </View>
      ) : (
        <Text>No se pudo cargar el clima</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  capital: {
    fontSize: 20,
    marginBottom: 15,
  },

  map: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },

  weatherBox: {
    marginTop: 20,
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});