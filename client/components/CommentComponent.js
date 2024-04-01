import React from "react";
import { Text, View } from "react-native";

const CommentComponent = ({comment}) => {
    // console.log(comment);
  return (
    <>
        <View className="flex justify-center px-7 py-4 border-b w-screen">
            <Text className="text-white">{comment?.username}</Text>
            <View className="flex justify-center  h-7">
                <Text className="text-white">{comment?.content}</Text>
            </View>
        </View>
    </>
  );
};

export default CommentComponent;
