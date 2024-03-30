import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import DetailPost from "./screens/DetailPost";
import TabNavigator from "./navigators/TabNavigator";
import { Alert, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StackNavigator from "./navigators/StackNavigator";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { SafeAreaView } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}
