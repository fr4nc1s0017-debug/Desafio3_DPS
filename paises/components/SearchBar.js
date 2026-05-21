import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";

export default function SearchBar({
  value,
  onChangeText,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar por país o capital..."
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
  },
});