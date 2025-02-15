import { View, Text, ScrollView } from "react-native";
import React from "react";
import { spacing } from "@/constants/sizes";
import SkeletonLoader from "./SkeletonLoader";

const LargeCardSkeleton = () => {
  return (
    <View
      style={{
        marginTop: spacing.base,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SkeletonLoader width={spacing.width * 0.5} height={40} />
        <SkeletonLoader width={spacing.width * 0.2} height={40} />
      </View>
      <ScrollView
        contentContainerStyle={{
          marginTop: spacing.sm,
          gap: spacing.sm,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {[...Array(3)].map((item,index) => (
          <View
            key={index}
            style={{
              gap: spacing.sm,
            }}
          >
            <SkeletonLoader
              width={spacing.width * 0.55}
              height={spacing.height * 0.2}
              borderRadius={spacing.sm}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default LargeCardSkeleton;
