import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import CardComponent from "../components/CardComponent";
import { gql, useQuery } from "@apollo/client";
const GET_POST = gql`
  query Query {
    sortByCreatedAt {
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
      _id
    }
  }
`;

const Home = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_POST);
  //   console.log(post);
  const onPress = (id) => {
    // console.log(id);
    navigation.navigate("DetailPost", {id});
  };
  return (
    <ScrollView className="bg-blue-950 h-screen w-screen">
      {data?.sortByCreatedAt.map((post, i) => (
        <TouchableOpacity onPress={()=> onPress(post._id)}>
          <CardComponent key={i} post={post}/>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Home;
