import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import CardComponent from "../components/CardComponent";
import CommentComponent from "../components/CommentComponent";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { gql, useQuery, useMutation } from "@apollo/client";
import GET_DETAIL from "../query/GET_DETAIL";
import { Icon, Input } from "react-native-elements";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import ADD_COMMENT from "../query/ADD_COMMENT";

const DetailPost = ({ route }) => {
  const [comment, setComment] = useState("");
  const { id } = route.params;
  const get_detail = useQuery(GET_DETAIL, {
    variables: { id },
  });

  const loadingDetail = get_detail.loading;
  const dataDetail = get_detail.data;
  if (loadingDetail) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const [commentPost, { loading }] = useMutation(ADD_COMMENT, {
    variables: {
      content: comment,
      id: dataDetail.getUser._id,
    },
    refetchQueries: [
      { query: GET_DETAIL, variables: { id: dataDetail.getUser._id } },
    ],
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <>
      <ScrollView className="bg-blue-950 h-screen w-screen">
        <CardComponent post={dataDetail.getUser} />
        {dataDetail.getUser.comments.map((comment) => (
          <>
            <CommentComponent comment={comment} />
          </>
        ))}
      </ScrollView>
      <View
        style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
        className="bg-white p-5">
        <Input
          className="p-2"
          leftIcon={<Icon name="comment" size={20} />}
          autoCapitalize={false}
          placeholder="Comment"
          onChangeText={setComment}
          value={comment}
          rightIcon={
            <GestureHandlerRootView>
              <TouchableOpacity
                onPress={() => {
                  commentPost();
                  setComment("");
                }}>
                <Icon name="send" size={20} />
              </TouchableOpacity>
            </GestureHandlerRootView>
          }
        />
      </View>
    </>
  );
};

export default DetailPost;
