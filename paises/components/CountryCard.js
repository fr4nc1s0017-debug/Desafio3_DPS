import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function CountryCard({
  country,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <Image
        source={{
          uri:
            country.flags?.png,
        }}
        style={styles.flag}
      />

      <View style={styles.info}>
        <Text style={styles.name}>
          {country.name?.common}
        </Text>

        <Text style={styles.capital}>
          {country.capital?.[0] ||
            "Sin capital"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  flag: {
    width: 90,
    height: 60,
    borderRadius: 10,
  },

  info: {
    marginLeft: 15,
    flex: 1,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
  },

  capital: {
    color: "gray",
    marginTop: 5,
    fontSize: 16,
  },
});