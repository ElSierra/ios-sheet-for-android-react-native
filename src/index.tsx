import React, { useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  useWindowDimensions,
  Platform,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Animated, {
  clamp,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import CustomBackground from "./components/bottom-sheet/CustomBg";
import { CustomBottomSheet } from "./components/bottom-sheet/bottomSheet";
import { Home } from "./screen/Home";
import { getCornerRadius } from "../modules/radius";
console.log("🚀 ~ file: App.tsx:7 ~ hello:", getCornerRadius());
const Main = () => {
  // ref
  const { top } = useSafeAreaInsets();
  const CORNER_RADIUS = getCornerRadius() === 0 ?20 : getCornerRadius();
  console.log("🚀 ~ file: index.tsx:36 ~ Main ~ CORNER_RADIUS:", CORNER_RADIUS);

  console.log("🚀 ~ file: index.tsx:30 ~ Main ~ top:", top);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { width, height } = useWindowDimensions();
  console.log("🚀 ~ file: App.tsx:27 ~ App ~ height:", height);
  const [isDark, setIsDark] = React.useState(false);

  // variables

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const animatedPosition = useSharedValue(0);
  const animatedValue = useSharedValue(height);
  const scaleValue = useMemo(
    () => (Platform.OS === "android" ? 0.91 : 0.855),
    []
  );

  const animStyle = useAnimatedStyle(() => {
    return {
      borderTopLeftRadius:
        Platform.OS === "ios"
          ? interpolate(animatedValue.value, [height / 1.5, top], [40, 10])
          : interpolate(
              animatedValue.value,
              [height / 1.5, top],
              [CORNER_RADIUS / 2.5, 10]
            ),
      borderTopRightRadius:
        Platform.OS === "ios"
          ? interpolate(animatedValue.value, [height / 1.5, top], [40, 10])
          : interpolate(
              animatedValue.value,
              [height / 1.5, top],
              [CORNER_RADIUS / 2.5, 10]
            ),
      transform: [
        // {
        //   translateY: interpolate(animatedValue.value, [height, 50], [0, 30]),
        // },

        {
          scale: interpolate(
            animatedValue.value,
            [height / 1.5, top],
            [0.974, scaleValue]
          ),
        },
      ],
    };
  });

  // renders

  useAnimatedReaction(
    () => animatedPosition.value,
    (position) => {
      if (position === 0) {
        animatedValue.value = withTiming(height);
        return;
      }
      animatedValue.value = clamp(position, 0, height);
    },
    []
  );

  useAnimatedReaction(
    () => animatedValue.value,
    (value) => {
      console.log("🚀 ~ file: App.tsx:96 ~ useAnimatedReaction ~ value", value);
    }
  );

  return (
    <>
      <StatusBar animated style={isDark ? "light" : "dark"} />
      <BottomSheetModalProvider>
        <View
          style={[
            {
              backgroundColor: "black",
            },
          ]}
        >
          <CustomBottomSheet
            animatedPosition={animatedPosition}
            bottomSheetModalRef={bottomSheetModalRef}
            setIsDark={setIsDark}
          />
          <Animated.View style={[styles.container, animStyle]}>
            {/* <Button
              onPress={handlePresentModalPress}
              title="Present Modal"
              color="black"
            /> */}
            <Home handlePresentModalPress={handlePresentModalPress} />
          </Animated.View>
        </View>
      </BottomSheetModalProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,

    borderRadius: 0,
    alignItems: "center",
  },
});

export default Main;
