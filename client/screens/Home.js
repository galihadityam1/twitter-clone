import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CardComponent from "../components/CardComponent";
import { useQuery } from "@apollo/client";
import GET_POST from "../query/GET_POST";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Home = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_POST);
  console.log("apapun");
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
