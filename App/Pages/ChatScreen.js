import { View, Text, SafeAreaView } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import tw from "twrnc";
import { GiftedChat } from "react-native-gifted-chat";
import GlobalApi from "../Services/GlobalApi";

const ChatScreen = () => {
  const param = useRoute().params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedChatFace, setSelectedChatFace] = useState([]);

  useEffect(() => {
    setSelectedChatFace(param.selectedFace);
    setMessages([
      {
        _id: 1,
        text: `Hello, I'm ${param.selectedFace?.name}, Your assistant. How can I help you today?`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: param.selectedFace?.image,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    if (messages[0].text) {
      getBardResp(messages[0].text);
    }
  }, []);

  const getBardResp = (msg) => {
    setLoading(true);
    GlobalApi.getBardApi(msg).then(
      (resp) => {
        if (resp.data.resp[1].content) {
          setLoading(false);
          const chatAPIResp = {
            _id: Math.random() * (9999999 - 1),
            text: resp.data.resp[1].content,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: param.selectedFace?.image,
            },
          };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, chatAPIResp)
          );
        } else {
          setLoading(false);
          const chatAPIResp = {
            _id: Math.random() * (9999999 - 1),
            text: "Sorry, I got some errors.",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: param.selectedFace?.image,
            },
          };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, chatAPIResp)
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <GiftedChat
        messages={messages}
        isTyping={loading}
        multiline={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
