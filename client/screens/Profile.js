import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Image } from "react-native-elements";
import { useQuery } from "@apollo/client";
import GET_PROFILE from "../query/GET_PROFILE";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CardProfileComponent from "../components/CardProfileComponent";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Profile = ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(GET_PROFILE, {
    refetchQuueries: [{ query: GET_PROFILE }],
  });
  
  console.log();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    // setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  const onPress = (id) => {
    navigation.navigate("DetailPost", { id });
  };
  // console.log(data?.myProfile.userPost);
  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color={Colors.primary} />
  //     </View>
  //   );
  // }
  return (
    <ScrollView
      className="bg-blue-950 h-screen w-screen"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
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
            <View className="border rounded-full">
              <Avatar
                containerStyle={{ backgroundColor: "#BDBDBD" }}
                rounded
                size="large"
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIORJkokYPFOFVyvIuYDNhOz4x0h0njBhyPw&usqp=CAU",
                }}
                title="P"
              />
            </View>
            <View className="flex flex-row">
              <Text className="text-white px-1 py-2">
                {data?.myProfile.name}
              </Text>
              <Text className="text-white px-1 py-2 opacity-40">
                @{data?.myProfile.username}
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-center items-center py-7">
            <GestureHandlerRootView className="flex flex-row justify-center items-center">
              <TouchableOpacity onPress={() => {
                navigation.navigate("FollowingScreen", {data: data.myProfile})
              }}>
                <Text className="text-white px-1">
                  {data?.myProfile.followings.length} Following
                </Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => {
                navigation.navigate("FollowerScreen", {data: data.myProfile})
              }}>
                <Text className="text-white px-1">
                  {data?.myProfile.followers.length} Follower
                </Text>
              </TouchableOpacity>
            </GestureHandlerRootView>
          </View>
        </View>
      </View>
      <GestureHandlerRootView>
        {data?.myProfile.userPost.map((post, i) => (
          <TouchableOpacity onPress={() => onPress(post._id)}>
            <CardProfileComponent
              post={post}
              name={data?.myProfile.name}
              username={data?.myProfile.username}
            />
          </TouchableOpacity>
        ))}
      </GestureHandlerRootView>
    </ScrollView>
  );
};

export default Profile;
