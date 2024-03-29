import React from "react";
import { ScrollView, Text, View } from "react-native";
import CardComponent from "../components/CardComponent";
import CommentComponent from "../components/CommentComponent";

const DetailPost = () => {
  return (
    <ScrollView className="bg-blue-950 h-screen w-screen">
      <CardComponent />
      <View className="flex w-full h-9 flex-row justify-around items-center border-b">
        <Text className="text-white">Comments <Text>(99)</Text></Text>
        <Text className="text-white">Likes <Text>(99)</Text></Text>
        <Text className="text-white">Tags <Text>(99)</Text></Text>
      </View>
        <CommentComponent/>
        <CommentComponent/>
        <CommentComponent/>
        <CommentComponent/>
        <CommentComponent/>
        <CommentComponent/>
        <CommentComponent/>
    </ScrollView>
  );
};

export default DetailPost;
