import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";
import CountryCard from "../components/CountryCard";
import { getCountries } from "../services/countriesApi";

export default function HomeScreen({
  navigation,
}) {
  const [countries, setCountries] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    const data =
      await getCountries();

    console.log(data);

    setCountries(data);

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>
        Países cargados:
        {" "}
        {countries.length}
      </Text>

<FlatList
  data={countries}
  keyExtractor={(item) =>
    item.cca3
  }
  renderItem={({ item }) => (
    <CountryCard
      country={item}
      onPress={() =>
        navigation.navigate(
          "Details",
          {
            country: item,
          }
        )
      }
    />
  )}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    padding: 15,
    backgroundColor: "#eee",
    marginBottom: 10,
    borderRadius: 10,
  },
});