import React, { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Icon, Input } from "react-native-elements";
import { Fontisto } from "@expo/vector-icons";
import SEARCH_BYNAME from "../query/SEARCH_BYNAME";
import { useNavigation } from "@react-navigation/native";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { gql, useQuery } from "@apollo/client";
import ProfileCard from "../components/ProfileCard";

const SearchScreen = ({navigation}) => {
  const [search, setSearch] = useState("");
  const { error, loading, data } = useQuery(SEARCH_BYNAME, {
    variables: { name: search },
  });

  const onPress = (name) => {
    navigation.navigate("ProfileSearch", {name})
  }

  return (
    <View className="bg-blue-950 h-screen w-screen">
      <View className="bg-white p-4">
        <Input
          className="p-2"
          autoCapitalize={false}
          disabledInputStyle={{ background: "#ddd" }}
          label="Search User"
          rightIcon={<Fontisto name="search" size={20} color="gray" />}
          placeholder="Enter Name"
          onChangeText={setSearch}
          value={search}
        />
      </View>
      <GestureHandlerRootView>
      {data?.userByName.map((el, i) => (
          <TouchableOpacity onPress={{}}>
            <ProfileCard profile={el} key={i} />
          </TouchableOpacity>
      ))}
      </GestureHandlerRootView>
    </View>
  );
};

export default SearchScreen;
