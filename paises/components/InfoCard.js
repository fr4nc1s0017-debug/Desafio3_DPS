import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function InfoCard({
  title,
  value,
  icon,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.icon}>
          {icon}
        </Text>

        <View>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.value}>
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    fontSize: 35,
    marginRight: 15,
  },

  title: {
    color: "gray",
    fontSize: 14,
    textTransform: "uppercase",
    marginBottom: 5,
  },

  value: {
    fontSize: 20,
    fontWeight: "bold",
  },
});