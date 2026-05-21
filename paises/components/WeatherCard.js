import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function WeatherCard({
  weather,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.temp}>
        🌤 {weather.main?.temp}°C
      </Text>

      <Text style={styles.desc}>
        {weather.weather?.[0]?.description}
      </Text>

      <View style={styles.row}>
        <Text>
          💧 {weather.main?.humidity}%
        </Text>

        <Text>
          🌬 {weather.wind?.speed} m/s
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },

  temp: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#1E73E8",
  },

  desc: {
    marginTop: 5,
    color: "gray",
    fontSize: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});