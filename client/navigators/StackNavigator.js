import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import TabNavigator from "./TabNavigator";
import Profile from "../screens/Profile";
import { Button } from "react-native";
import { useState } from "react";
import * as SecureStorage from "expo-secure-store";
import AuthContext from "../context/auth";
import DetailPost from "../screens/DetailPost";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  (async () => {
    const accessToken = await SecureStorage.getItemAsync("accessToken");
    if (accessToken) {
      setIsSignIn(true);
    }
  })();
  console.log(isSignIn, "<<< ini status");``

  return (
    <AuthContext.Provider value={{ isSignIn, setIsSignIn }}>
      <Stack.Navigator
        screenOptions={{
          title: "Twitter",
          headerRight: () => {
            return (
              <Button
                title="Logout"
                onPress={ async () => {
                  await SecureStorage.deleteItemAsync("accessToken")
                  setIsSignIn(false)
                  console.log("udh di delete", isSignIn);
                }}
              />
            );
          },
        }}>
        {!isSignIn ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen name="DetailPost" component={DetailPost} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};

export default StackNavigator;
