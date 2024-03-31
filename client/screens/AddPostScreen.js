import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Image, Input } from "react-native-elements";
import { Fontisto } from "@expo/vector-icons";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import ADD_POST from "../query/ADD_POST";
import { Colors } from "react-native/Libraries/NewAppScreen";
import GET_POST from "../query/GET_POST";

const AddPostScreen = () => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");

  const [addPost, { loading, data, error }] = useMutation(ADD_POST, {
    variables: {
      content,
      tags,
      imgUrl: image,
    },
    refetchQueries: {
        query: GET_POST
    }
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <GestureHandlerRootView>
      <ScrollView className="bg-blue-950 h-screen w-screen">
        <View className="px-2 py-4">
          <View className="flex flex-row justify-between">
            <Text className="text-white py-2 px-3">Tweet Something</Text>
            <View className="mr-4 py-2">
              <TouchableOpacity onPress={() => {
                addPost()
                setContent("")
                setTags("")
                setImage("")
              }}>
                <Fontisto name="paw" size={18} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="py-3">
            <Input
              className="p-2 text-white"
              autoCapitalize={false}
              disabledInputStyle={{ background: "#ddd" }}
              leftIcon={
                <Image
                  className="w-8 h-8 rounded-3xl border border-gray-500"
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIORJkokYPFOFVyvIuYDNhOz4x0h0njBhyPw&usqp=CAU",
                  }}
                />
              }
              rightIcon={<Fontisto name="question" size={15} color="gray" />}
              placeholder="What's happening?"
              onChangeText={setContent}
              value={content}
            />
            <View className="flex flex-row">
              <View className="flex-1">
                <Input
                  className="p-2 text-white"
                  autoCapitalize={false}
                  disabledInputStyle={{ background: "#ddd" }}
                  placeholder="Input image Url"
                  rightIcon={<Fontisto name="picture" size={15} color="gray" />}
                  onChangeText={setImage}
                  value={image}
                />
              </View>
              <View className="flex-1">
                <Input
                  className="p-2 text-white"
                  autoCapitalize={false}
                  disabledInputStyle={{ background: "#ddd" }}
                  placeholder="Any tags?"
                  rightIcon={<Fontisto name="hashtag" size={15} color="gray" />}
                  onChangeText={setTags}
                  value={tags}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default AddPostScreen;
