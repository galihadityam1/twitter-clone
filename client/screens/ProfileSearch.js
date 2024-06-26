import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, Image } from "react-native-elements";
import CardProfileComponent from "../components/CardProfileComponent";
import {
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import { useMutation, useQuery } from "@apollo/client";
import { Fontisto } from "@expo/vector-icons";
import FOLLOW from "../query/FOLLOW";
import SEARCH_BYNAME from "../query/SEARCH_BYNAME";
import { Colors } from "react-native/Libraries/NewAppScreen";

const ProfileSearch = ({ navigation, route }) => {
  const { name } = route.params;
  const [idFollow, setIdFollow] = useState("");
  let { error, loading, data } = useQuery(SEARCH_BYNAME, {
    variables: { name: name },
  });
//   if (!data) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color={Colors.primary} />
//       </View>
//     );
//   }

  data = data?.userByName[0]
  console.log(data);

  const onPress = (id) => {
    navigation.navigate("DetailPost", { id });
  };

  const [followUser, { refetch }] = useMutation(FOLLOW, {
    variables: {
      idFollow,
    },
    onError: (error) => {
      Alert.alert("Error Follow", error.message);
    },
    refetchQueries: [SEARCH_BYNAME]
  });

  const onFollow = (idFollow) => {
    console.log(idFollow);
    followUser({
      variables: { idFollow },
    });
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  return (
    <GestureHandlerRootView>
      <ScrollView
        className="bg-blue-950 h-screen w-screen "
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
          <View className="h-36 flex flex-col">
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
                <Text className="text-white px-1 py-2">{data?.name}</Text>
                <Text className="text-white px-1 py-2 opacity-40">
                  @{data?.username}
                </Text>
              </View>
            </View>
            <View className="flex flex-col">
              <View className="flex flex-row justify-center z-20 items-center py-7">
                <Text className="text-white px-1 z-50">
                  {data?.followings?.length} Followings
                </Text>
                <Text className="text-white px-1">
                  {data?.followers?.length} Followers
                </Text>
              </View>
              <View className=" -my-4 flex justify-center items-center z-0">
                <Button
                  onPress={() => {
                    onFollow(data?._id);
                    setIdFollow(data?._id);
                  }}
                  className="ml-1 h-8 text-center w-15 flex text-xs z-50"
                  title="Follow"
                  type="outline"
                />
              </View>
            </View>
          </View>
        </View>
        <GestureHandlerRootView>
          {data?.userPost?.map((post, i) => (
            <TouchableOpacity onPress={() => onPress(post._id)}>
              <CardProfileComponent
                post={post}
                name={data.name}
                username={data.username}
              />
            </TouchableOpacity>
          ))}
        </GestureHandlerRootView>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default ProfileSearch;
