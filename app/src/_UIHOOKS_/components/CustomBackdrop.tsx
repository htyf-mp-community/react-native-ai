import React, { useMemo } from "react";
import {Pressable} from 'react-native';
import { BottomSheetBackdropProps, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const CustomBackdrop = (props: BottomSheetBackdropProps) => {
  const { animatedIndex, style, index } = props;
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "rgba(0,0,0,.5)",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );
  console.log('animatedIndex.value', animatedIndex.value)
  return <BottomSheetBackdrop
    {...props}
    style={containerStyle}
    pressBehavior="none"
    gonesOnIndex={-1}
    appearsOnIndex={0}
    enableTouchThrough={false}
    opacity={0.4}
  />;
};

export default CustomBackdrop;