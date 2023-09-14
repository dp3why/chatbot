// import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import tw from "twrnc";
import HomeNavigation from "./App/Navigation/HomeNavigation";

export default function App() {
  return (
    <View style={tw`h-[100%] bg-yellow-200`}>
      <NavigationContainer>
        <HomeNavigation />
      </NavigationContainer>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}
