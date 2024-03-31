import { ActivityIndicator, Alert, Image, ScrollView, Text, View } from "react-native";
import { useMutation } from "@apollo/client";
import ADD_LIKE from "../query/ADD_LIKE";
import GET_DETAIL from "../query/GET_DETAIL";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";

const CardComponent = ({ post }) => {
  if(!post.authorDetail){
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  const [likePost] =
    useMutation(ADD_LIKE, {
      variables: { id: post._id },
      refetchQueries: [
        {
          query: GET_DETAIL,
          variables: { id: post._id },
        },
      ],
      onError: (error) => {
        Alert.alert("Error liking post", error.message);
      },
    });
  return (
    <>
      <View className="bg-blue-950 p-7 py-4 border">
        <View className="flex flex-row align-middle">
          <View className="flex flex-row py-3">
            <Image
              className="w-10 h-10 rounded-3xl"
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIORJkokYPFOFVyvIuYDNhOz4x0h0njBhyPw&usqp=CAU",
              }}
            />
          </View>
          <View className="flex-1 p-2 px-3">
            <Text className="font-semibold text-white">
              {post.authorDetail.name}
              {"  "}
              <Text className="font-normal text-gray-300 opacity-40">
                @{post.authorDetail.username}
              </Text>
            </Text>

            <Text className="text-white font-light py-1">{post.content}</Text>
            <View className="w-full h-40 flex flex-row">
              <Image
                className="w-40 h-40 rounded-lg flex-1 border"
                source={{
                  uri: post.imgUrl,
                }}
              />
            </View>
          </View>
        </View>
        <View className=" flex w-90 px-3 justify-between items-center flex-row">
          <Text className="text-gray-300 opacity-60">
            Comments ({post.comments.length})
          </Text>
          <GestureHandlerRootView className="text-center">
            <TouchableOpacity
              onPress={() => {
                likePost({ variables: { id: post._id } });
              }}>
              <Text className="text-gray-300 opacity-60">
                Likes ({post.likes.length})
              </Text>
            </TouchableOpacity>
          </GestureHandlerRootView>
          <Text className="text-gray-300 opacity-60">
            Tags ({post.tags.length})
          </Text>
        </View>
      </View>
    </>
  );
};

export default CardComponent;
