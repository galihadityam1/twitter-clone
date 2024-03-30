import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { gql, useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { useContext, useState } from "react";
import AuthContext from "../context/auth";

const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      accessToken
    }
  }
`;

const Login = ({ navigation }) => {
  const { isSignIn, setIsSignIn } = useContext(AuthContext)
  // console.log(isSignIn);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFunction, { error, loading, data }] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      await SecureStore.setItemAsync(
        "accessToken",
        data?.loginUser.accessToken
        );
        setIsSignIn(true)
    },
  });

  const handleLogin = async () => {
    try {
      await loginFunction({
        variables: { username, password },
      });
      console.log('masuk');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex flex-col items-center p-4 bg-slate-300 h-screen">
      <View className="container max-w-full mx-auto py-24 px-6">
        <View className="max-w-sm mx-auto px-6">
          <View className="relative flex flex-wrap">
            <View className="w-full relative">
              <View className="mt-6">
                <View className="flex justify-center items-center h-12 mr-8">
                  <Icon name="paw" size={30} color={"blue"} />
                </View>
                <View className="text-center items-center gap-4 flex">
                  <Text className="font-semibold text-black text-2xl px-10 w-80">
                    Welcome to Twittor
                  </Text>
                  <View className="gap-4 w-screen mr-8 px-10 h-80 justify-center">
                    <Input
                      label="Sign In First"
                      autoCapitalize={false}
                      leftIcon={<Icon name="account-outline" size={20} />}
                      placeholder="Enter Username"
                      onChangeText={setUsername}
                      value={username}
                    />
                    <Input
                      leftIcon={<Icon name="key" size={20} />}
                      autoCapitalize={false}
                      placeholder="Enter Password"
                      onChangeText={setPassword}
                      value={password}
                    />
                    <Button title={"Login"} onPress={handleLogin} />
                  </View>
                  <View className="w-80 items-center justify-center flex h-6 mr-8">
                    <Text>
                      Don't You Have an Account?{" "}
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Register");
                        }}>
                        <Text className="text-blue-700 hover:underline">
                          Sign Up
                        </Text>
                      </TouchableOpacity>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
