import React, { useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import { View, useColorScheme } from "react-native";

export const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  console.log(
    "🚀 ~ file: CustomBg.tsx:13 ~ animatedIndex:",
    animatedIndex.value
  );

  //#region styles
  const theme = useColorScheme();

  const isDarkTheme = theme === "dark";

  // render
  return (
    <>
      <Animated.View
        pointerEvents="none"
        style={[
          style,
          
          { borderRadius: 10, backgroundColor:"white" },
        ]}
      ></Animated.View>
    </>
  );
};

export default CustomBackground;
