import { Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/constants/color";
import { fonts } from "@/constants/fonts";
import { fontSize, spacing } from "@/constants/sizes";
import Button from "./buttons/Button";

interface NoInternetErrorProps {
  reload: () => void;
}

const NoInternetError = ({ reload }: NoInternetErrorProps) => {
  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: spacing.base,
        gap: spacing.lg,
      }}
    >
      <Feather name="wifi-off" size={40} color={colors.primary} />
      <Text
        style={{
          fontFamily: fonts.SoraMedium,
          fontSize: fontSize.md,
          color: colors.text,
        }}
      >
        No Internet Connection
      </Text>

      <Button onPress={reload} label="Refresh" />
    </View>
  );
};

export default NoInternetError;
