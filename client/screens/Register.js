import { View, Text, Linking, TouchableOpacity, Alert } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ion from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import ADD_USER from "../query/ADD_USER";

const Register = ({ navigation }) => {
    const [name, setName ] =  useState("")
    const [username, setUsername ] =  useState("")
    const [email, setEmail ] =  useState("")
    const [password, setPassword ] =  useState("")

    const [addUser, {loading, data, error}] = useMutation(ADD_USER, {
        variables: {
            name,
            password,
            email,
            username
        },
        onCompleted: () => {
            Alert.alert("Registrations Success", "Succes")
        }
    })
  return (
    <View className="flex flex-col items-center p-4 bg-slate-300 h-screen">
      <View className="container max-w-full mx-auto py-24">
        <View className="max-w-sm mx-auto">
          <View className="relative flex flex-wrap">
            <View className="w-full relative">
              <View className="mt-6">
                <View className="flex justify-center items-center h-12 mr-8">
                  <Icon name="paw" size={30} color={"blue"} />
                </View>
                <View className="text-center items-center gap-4 flex">
                  <Text className="font-semibold text-black text-2xl px-10 w-80">
                    Register to Twittor
                  </Text>
                  <View className="gap-4 w-screen mr-12 px-10 h-100 justify-center py-4">
                    <Input
                      label="Register Form"
                      leftIcon={<Icon name="account-outline" size={20} />}
                      placeholder="Enter Username"
                      onChangeText={setUsername}
                      value={username}
                    />
                    <Input
                      leftIcon={<Ion name="finger-print-outline" size={20} />}
                      placeholder="Enter Name"
                      onChangeText={setName}
                      value={name}
                    />
                    <Input
                      leftIcon={<Ion name="person-circle-outline" size={20} />}
                      placeholder="Enter Email"
                      onChangeText={setEmail}
                      value={email}
                    />
                    <Input
                      leftIcon={<Icon name="key" size={20} />}
                      placeholder="Enter Password"
                      onChangeText={setPassword}
                      value={password}
                    />
                    <Button title={"Submit"} onPress={() => {
                        addUser()
                        setEmail("")
                        setPassword("")
                        setUsername("")
                        setName("")
                    }}/>
                  </View>
                  <View className="w-80 items-center justify-center flex h-6 mr-8">
                    <Text>
                      Already Have an Account?{" "}
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Login");
                        }}>
                        <Text className="text-blue-700 hover:underline">
                          Login
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

export default Register;
