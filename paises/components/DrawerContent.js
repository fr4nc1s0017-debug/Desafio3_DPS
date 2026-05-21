import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import {
    DrawerContentScrollView,
} from "@react-navigation/drawer";

const continents = [
    {
        name: "Africa",
        label: "🌍 África",
    },

    {
        name: "Antarctic",
        label: "🧊 Antártida",
    },

    {
        name: "Asia",
        label: "🌏 Asia",
    },

    {
        name: "Europe",
        label: "🏰 Europa",
    },

    {
        name: "Americas",
        label: "🌎 América",
    },

    {
        name: "Oceania",
        label: "🌊 Oceanía",
    },
];

export default function DrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Text style={styles.emoji}>
                    🌍
                </Text>

                <Text style={styles.title}>
                    Países del Mundo
                </Text>

                <Text style={styles.subtitle}>
                    250 países en total
                </Text>
            </View>

            <View style={styles.menu}>
                {continents.map((item) => (
                    <TouchableOpacity
                        key={item.name}
                        style={styles.item}

                        onPress={() => {
                            props.navigation.closeDrawer();

                            props.navigation.navigate(
                                "Home",
                                {
                                    region: item.name,
                                }
                            );
                        }}


                    >
                        <Text style={styles.label}>
                            {item.label}
                        </Text>

                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>
                                {item.count}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#1E73E8",
        padding: 30,
        alignItems: "center",
    },

    emoji: {
        fontSize: 55,
    },

    title: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 10,
    },

    subtitle: {
        color: "#ddd",
        marginTop: 5,
        fontSize: 16,
    },

    menu: {
        padding: 15,
    },

    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        backgroundColor: "#fff",

        padding: 18,
        borderRadius: 15,

        marginBottom: 12,
    },

    label: {
        fontSize: 18,
        fontWeight: "600",
    },

    badge: {
        backgroundColor: "#1E73E8",
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
    },

    badgeText: {
        color: "#fff",
        fontWeight: "bold",
    },
});