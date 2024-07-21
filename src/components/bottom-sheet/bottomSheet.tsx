import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  Alert,
  BackHandler,
  Platform,
  Text,
  useWindowDimensions,
} from "react-native";
import CustomBackground from "./CustomBg";
import { SharedValue, useSharedValue } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CustomBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  animatedPosition: SharedValue<number>;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  // add your custom props here
};
export const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  bottomSheetModalRef,
  animatedPosition,
  setIsDark,
}) => {
  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const percentage =
    Platform.OS === "ios" ? ((height - top) / height) * 100 - 2 : "94.5";
  console.log("🚀 ~ file: bottomSheet.tsx:27 ~ percentage:", percentage);

  console.log("🚀 ~ file: bottomSheet.tsx:26 ~ top:", top, height);

  const snapPoints = useMemo(() => ["25%", `${percentage}%`], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <>
        <BottomSheetBackdrop
          {...props}
          opacity={0.3}
          pressBehavior={"close"}
          disappearsOnIndex={-1}
          appearsOnIndex={3}
        />
      </>
    ),
    []
  );

  useEffect(() => {
    const backAction = () => {
      bottomSheetModalRef.current?.dismiss();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const sheetChange = useSharedValue(0);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    sheetChange.value = index;
    if (index === 1) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);
  return (
    <BottomSheetModal
      animationConfigs={{
        overshootClamping: true,
        clamp: {
          min: 100,
          max: 400,
        },
      }}
      ref={bottomSheetModalRef}
      index={1}
      backgroundComponent={CustomBackground}
      handleIndicatorStyle={{ display: "none" }}
      animatedPosition={animatedPosition}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheetModal>
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
