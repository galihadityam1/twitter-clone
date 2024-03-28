import { View, Text } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const Login = () => {
  return (
    <View className="flex flex-col items-center p-4 bg-slate-300 h-screen">
      <View className="container max-w-full mx-auto py-24 px-6">
        <View className="max-w-sm mx-auto px-6">
          <View className="relative flex flex-wrap">
            <View className="w-full relative">
              <View className="mt-6">
                <View className="text-center items-center gap-4 flex">
                  <Text className="font-semibold text-black text-2xl px-10 w-80">
                    Welcome to Twittor
                  </Text>
                  <View className="gap-4 w-screen mr-8 px-10">
                    <Input
                      label="Sign In First"
                      leftIcon={<Icon name="account-outline" size={20}/>}
                      placeholder="Enter Name"
                    />
                    <Input
                      leftIcon={<Icon name="key" size={20}/>}
                      placeholder="Enter Password"
                    />
                    <Button title={"Submit"} />
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
