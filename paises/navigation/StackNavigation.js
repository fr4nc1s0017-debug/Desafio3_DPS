import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createDrawerNavigator,
} from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";

const Drawer =
  createDrawerNavigator();

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor:
              "#1E73E8",
          },

          headerTintColor:
            "#fff",
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title:
              "🌍 Países",
          }}
        />

        <Drawer.Screen
          name="Details"
          component={DetailScreen}
          options={{
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}