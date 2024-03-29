import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import CardComponent from "../components/CardComponent";

const Home = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate("DetailPost");
  };
  return (
    <ScrollView className="bg-blue-950 h-screen w-screen">
      <TouchableOpacity onPress={onPress}>
        <CardComponent />
      </TouchableOpacity>
        <CardComponent />
        <CardComponent />
    </ScrollView>
  );
};

export default Home;
