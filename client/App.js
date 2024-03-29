import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import DetailPost from "./screens/DetailPost";
import TabNavigator from "./navigators/TabNavigator";
import { Alert, Button } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: "Twitter",
          headerRight: () => {
            return (
              <Button
                title="Submit"
                onPress={() => {
                  Alert.alert("Masuk");
                }}
              />
            );
          },
        }}>
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="DetailPost" component={TabNavigator} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
