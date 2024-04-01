import React from "react";
import { Text, View } from "react-native";
import { Image } from "react-native-elements";

const ProfileCard = ({ profile }) => {
  // console.log(profile);
  return (
    <View className="flex flex-row align-middle border border-white px-4">
      <View className="flex flex-row py-3">
        <Image
          className="w-10 h-10 rounded-3xl"
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIORJkokYPFOFVyvIuYDNhOz4x0h0njBhyPw&usqp=CAU",
          }}
        />
      </View>
      <View className=" border-white flex-1 justify-center px-2 flex-col">
        <View className=" h-6 flex flex-row">
          <Text className="font-semibold text-white">{profile.name}</Text>
          <Text className="px-2 font-normal text-gray-300 opacity-40">
            @{profile.username}
          </Text>
        </View>
        {profile.followings ? (
        <View className="flex flex-row">
          <Text className="text-white text-xs">
            Followings {profile.followings.length}
          </Text>
          <Text className="px-2 text-white text-xs">
            Followers {profile.followers.length}
          </Text>
        </View>) : undefined
        }
      </View>
    </View>
  );
};

export default ProfileCard;
