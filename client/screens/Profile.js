import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Avatar, Image } from "react-native-elements";
import CardComponent from "../components/CardComponent";

const Profile = () => {
  return (
    <ScrollView className="bg-blue-950 h-screen w-screen">
      <View className="border-y border-neutral-400">
        <View className="border">
          <Image
            className="w-full h-40"
            source={{
              uri: "https://www.allkpop.com/upload/2023/07/content/092005/1688947522-befunky-collage-2023-07-09t190517.jpg",
            }}
          />
        </View>
        <View className="h-32 flex flex-col">
          <View className="-my-7 z-10 px-4 flex items-center">
            <Avatar
              containerStyle={{ backgroundColor: "#BDBDBD" }}
              rounded
              size="large"
              source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIORJkokYPFOFVyvIuYDNhOz4x0h0njBhyPw&usqp=CAU" }}
              title="P"
            />
            <View className="flex flex-row">
              <Text className="text-white px-1 py-2">Kazuha</Text>
              <Text className="text-white px-1 py-2 opacity-30">@kazuha123</Text>
            </View>
          </View>
          <View className="flex flex-row justify-center items-center py-7">
            <Text className="text-white px-1">999 Following</Text>
            <Text className="text-white px-1">999 Follower</Text>
          </View>
        </View>
      </View>
      <CardComponent/>
      <CardComponent/>
      <CardComponent/>
    </ScrollView>
  );
};

export default Profile;
