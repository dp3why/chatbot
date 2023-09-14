import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChatFaceData from "../Services/ChatFaceData";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const HomeScreen = () => {
  const [chatFaceData, setChatFaceData] = useState(ChatFaceData);
  const [selectedChateFaceData, setSelectedChateFaceData] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    setChatFaceData(ChatFaceData);
    setSelectedChateFaceData(ChatFaceData[0]);
  }, []);
  const onChatFacePress = (id) => {
    setSelectedChateFaceData(ChatFaceData[id - 1]);
  };
  return (
    <SafeAreaView style={tw`flex m-2 justify-start items-center`}>
      <Text
        style={tw`mt-15 font-bold text-3xl 
                text-orange-500`}
      >
        Hello
      </Text>
      <Text style={tw`font-semibold text-2xl`}>
        I am {selectedChateFaceData && selectedChateFaceData.name}
      </Text>
      <Image
        source={{ uri: selectedChateFaceData && selectedChateFaceData.image }}
        style={tw`mt-10 w-45 h-45`}
      />
      <Text style={tw` my-8 font-bold text-2xl text-blue-800`}>
        Happy to chat with you!
      </Text>
      <View style={tw` mx-1 px-6 h-40 rounded-xl bg-neutral-200`}>
        <FlatList
          style={tw`mt-8 `}
          data={chatFaceData}
          horizontal={true}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`mx-3 `}
              onPress={() => onChatFacePress(item.id)}
            >
              <Image source={{ uri: item.image }} style={tw`w-12 h-10`} />
            </TouchableOpacity>
          )}
        />
        <Text style={tw`mb-5 text-center text-neutral-500`}>
          Choose Your favorite ChatBuddy
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("chat", {
            selectedFace: selectedChateFaceData,
          })
        }
        style={[
          {
            backgroundColor: `${
              selectedChateFaceData ? selectedChateFaceData.primary : "#F5F5F5"
            }`,
            paddingVertical: 12,
            width: Dimensions.get("screen").width * 0.5,
            borderRadius: 90,
            alignItems: "center",
            marginTop: 20,
          },
        ]}
      >
        <Text
          style={tw` text-2xl font-semibold 
        text-center text-white`}
        >
          Chat
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
