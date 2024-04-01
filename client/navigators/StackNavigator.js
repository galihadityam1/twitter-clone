import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import TabNavigator from "./TabNavigator";
import Profile from "../screens/Profile";
import { Button, View } from "react-native";
import { useState } from "react";
import * as SecureStorage from "expo-secure-store";
import AuthContext from "../context/auth";
import DetailPost from "../screens/DetailPost";
import SearchScreen from "../screens/SearchScreen";
import ProfileSearch from "../screens/ProfileSearch";
import { Image } from "react-native-elements";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  //   console.log(useNavigation());
  //   const {navigate} = useNavigation()
  (async () => {
    const accessToken = await SecureStorage.getItemAsync("accessToken");
    if (accessToken) {
      setIsSignIn(true);
    }
  })();
  console.log(isSignIn, "<<< ini status");

  return (
    <AuthContext.Provider value={{ isSignIn, setIsSignIn }}>
      <Stack.Navigator
        screenOptions={{
          title: "Twitter",
          headerRight: () => {
            return (
              <Button
                title="Logout"
                onPress={async () => {
                  await SecureStorage.deleteItemAsync("accessToken");
                  setIsSignIn(false);
                  console.log("udh di delete", isSignIn);
                }}
              />
            );
          },
          headerLeft: () => {
            return (
              <GestureHandlerRootView className="z-0">
                <TouchableOpacity onPress={() => {}}>
                  <View className="px-3 w-16 z-0">
                    <Image
                      className="w-8 h-8 rounded-3xl border"
                      source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIORJkokYPFOFVyvIuYDNhOz4x0h0njBhyPw&usqp=CAU",
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </GestureHandlerRootView>
            );
          },
        }}>
        {!isSignIn ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
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
            <Stack.Screen name="ProfileSearch" component={ProfileSearch} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};

export default StackNavigator;
