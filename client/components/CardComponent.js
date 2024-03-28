import { Image, ScrollView, Text, View } from "react-native";
import { Card } from "react-native-elements";

const CardComponent = () => {
  return (
    <>
    <View className="bg-blue-950 p-7 py-4 border">
      <View className="flex flex-row align-middle">
        <View className="flex flex-row border">
          <Image className="w-10 h-10 rounded-lg" src="./assets/splash.png" />
        </View>
        <View className="flex-1 border p-2">
          <Text className="font-semibold text-white">Name  <Text className="font-normal text-gray-300 opacity-30">@Username</Text></Text>
          
          <Text className="text-white font-light">
            What Is Lorem Ipsum and Why Is It Used? - Solopress UK Lorem Ipsum,
            sometimes referred to as 'lipsum', is the placeholder text used in
            design when creating content. It helps designers plan out where the
            content will sit, without needing to wait for the content to be
            written and approved. It originally comes from a Latin text, but to
            today's reader, it's seen as gibberish.
          </Text>
          <View className="w-full h-40 border flex flex-row">

          <Image className="w-40 h-40 rounded-lg" src="./assets/splash.png" />
          <Image className="w-40 h-40 rounded-lg" src="./assets/splash.png" />
          </View>

        </View>
      </View>
    </View>
    <View className="bg-blue-950 h-full w-ful p-7 py-4 border">
      <View className="flex flex-row align-middle">
        <View className="flex flex-row border">
          <Image className="w-10 h-10 rounded-lg" src="./assets/splash.png" />
        </View>
        <View className="flex-1 border p-2">
          <Text className="font-semibold text-white">Name  <Text className="font-normal text-gray-300 opacity-30">@Username</Text></Text>
          
          <Text className="text-white font-light">
            What Is Lorem Ipsum and Why Is It Used? - Solopress UK Lorem Ipsum,
            sometimes referred to as 'lipsum', is the placeholder text used in
            design when creating content. It helps designers plan out where the
            content will sit, without needing to wait for the content to be
            written and approved. It originally comes from a Latin text, but to
            today's reader, it's seen as gibberish.
          </Text>
          <View className="w-full h-40 border flex flex-row">

          <Image className="w-40 h-40 rounded-lg" src="./assets/splash.png" />
          <Image className="w-40 h-40 rounded-lg" src="./assets/splash.png" />
          </View>

        </View>
      </View>
    </View>
    </>
  );
};

export default CardComponent;
