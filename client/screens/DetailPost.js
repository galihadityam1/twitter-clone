import React from "react";
import { ScrollView, Text, View } from "react-native";
import CardComponent from "../components/CardComponent";
import CommentComponent from "../components/CommentComponent";
import { gql } from "@apollo/client"
const GET_DETAIL = gql`
query Query($id: ID!) {
  getUser(_id: $id) {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    authorDetail {
      _id
      email
      name
      username
    }
  }
}
`

const DetailPost = ({id}) => {
  return (
    <ScrollView className="bg-blue-950 h-screen w-screen">
      <CardComponent id={id}/>
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
