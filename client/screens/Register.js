import { View, Text, Linking } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ion from "react-native-vector-icons/Ionicons";
import { useCallback } from "react";
import Login from "./Login";

const OpenLoginPage = ({children}) => {
    const handlePress = useCallback(async () => {
      await Linking.Login();
    }, []);
  
    return <Button title="Login" onPress={Login} />;
  };
const Register = () => {
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
                  Register to Twittor
                </Text>
                <View className="gap-4 w-screen mr-8 px-10 h-100 justify-center">
                  <Input
                    label="Register Form"
                    leftIcon={<Icon name="account-outline" size={20} />}
                    placeholder="Enter Username"
                  />
                  <Input
                    leftIcon={<Ion name="finger-print-outline" size={20}/>}
                    placeholder="Enter Name"
                  />
                  <Input
                    leftIcon={<Ion name="person-circle-outline" size={20} />}
                    placeholder="Enter Email"
                  />
                  <Input
                    leftIcon={<Icon name="key" size={20} />}
                    placeholder="Enter Password"
                  />
                  <Button title={"Submit"} />
                </View>
                <View className="w-80 items-center justify-center flex h-6 mr-8">
                  <Text>Already Have an Account? <Text className="text-blue-700 hover:underline">Login</Text></Text>
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
