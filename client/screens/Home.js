import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import CardComponent from "../components/CardComponent";
import { gql, useQuery } from "@apollo/client";
import GET_POST from "../query/GET_POST";

const Home = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_POST);
    console.log(data);
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
