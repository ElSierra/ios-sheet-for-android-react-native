import { View, Text, useWindowDimensions, Button } from "react-native";
import React from "react";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AnimatedButton } from "../components/animated-button/animatedButton";

type HomeProps = {
  handlePresentModalPress: () => void;
};

export const Home: React.FC<HomeProps> = ({ handlePresentModalPress }) => {
  const { height, width } = useWindowDimensions();
  const { dismiss, dismissAll } = useBottomSheetModal();
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <AnimatedButton
        onPress={handlePresentModalPress}
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#F06C00",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white" }}>Press Me</Text>
      </AnimatedButton>
    </View>
  );
};
