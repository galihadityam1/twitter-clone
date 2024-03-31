import { Image, ScrollView, Text, View } from "react-native";
import { Card } from "react-native-elements";

const CardProfileComponent = ({ post, name, username }) => {
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
              {name}
              {"  "}
              <Text className="font-normal text-gray-300 opacity-40">
                {username}
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
          <Text className="text-gray-300 opacity-60">Comments ({post.comments.length})</Text>
          <Text className="text-gray-300 opacity-60">Likes ({post.likes.length})</Text>
          <Text className="text-gray-300 opacity-60">Tags ({post.tags.length})</Text>
        </View>
      </View>
    </>
  );
};

export default CardProfileComponent;
