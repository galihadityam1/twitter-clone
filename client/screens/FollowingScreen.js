import React from "react";
import { Text, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import ProfileCard from "../components/ProfileCard";

const FollowingScreen = ({ route }) => {
  const { data } = route.params;
  console.log(data.followings);
  return (
    <GestureHandlerRootView>
      <ScrollView className="bg-blue-950 h-screen w-screen">
        <View className="flex flex-col">
          <View>
            <Text className="text-white p-4">Followings</Text>
          </View>
          <View>
            {data?.followingsDetail?.map((el, i) => (
              <ProfileCard profile={el} />
            ))}
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default FollowingScreen;
