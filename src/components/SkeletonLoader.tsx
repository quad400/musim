import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { spacing } from "@/constants/sizes";

// Skeleton Component
const SkeletonLoader = ({
  width,
  height,
  borderRadius = spacing.sm,
}: {
  width: number;
  height: number;
  borderRadius?: number;
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      })
    ).start();
  }, [animatedValue]);

  const shimmerInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["-100%", "100%"],
  });

  return (
    <View style={[styles.skeletonContainer, { width, height, borderRadius }]}>
      <Animated.View
        style={[
          styles.shimmer,
          { transform: [{ translateX: shimmerInterpolation }] },
        ]}
      >
        <LinearGradient
          colors={["#000000", "#212121", "#09122C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  skeletonContainer: {
    backgroundColor: "#000000",
    overflow: "hidden",
  },
  shimmer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  gradient: {
    width: "150%",
    height: "100%",
  },
});

export default SkeletonLoader;
