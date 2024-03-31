import React, { useCallback, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CardComponent from "../components/CardComponent";
import { useQuery } from "@apollo/client";
import GET_POST from "../query/GET_POST";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Home = ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(GET_POST);
  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color={Colors.primary} />
  //     </View>
  //   );
  // }

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  const onPress = (id) => {
    navigation.navigate("DetailPost", {id});
  };
  return (
    <ScrollView className="bg-blue-950 h-screen w-screen" refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      {data?.sortByCreatedAt.map((post, i) => (
        <TouchableOpacity onPress={()=> onPress(post._id)}>
          <CardComponent key={i} post={post}/>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Home;
