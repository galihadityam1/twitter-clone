import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import CardComponent from "../components/CardComponent";
import CommentComponent from "../components/CommentComponent";
import { gql, useQuery } from "@apollo/client";
import { Colors } from "react-native/Libraries/NewAppScreen";
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
`;

const DetailPost = ({ route }) => {
  const { id } = route.params;
  const { loading, data, error } = useQuery(GET_DETAIL, {
    variables: { id },
  });
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  return (
    <ScrollView className="bg-blue-950 h-screen w-screen">
      <CardComponent post={data.getUser} />
      {data.getUser.comments.map((comment) => (
      <CommentComponent comment={comment}/>
      ))}
    </ScrollView>
  );
};

export default DetailPost;
