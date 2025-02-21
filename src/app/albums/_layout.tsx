import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { colors } from "@/constants/color";
import IconButton from "@/components/buttons/IconButton";
import { AntDesign } from "@expo/vector-icons";
import FloatingPlayer from "@/components/FloatingPlayer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fontSize, spacing } from "@/constants/sizes";
import { fonts } from "@/constants/fonts";

const AlbumLayout = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <Stack>
        <Stack.Screen
          name="[id]/index"
          options={{
            contentStyle: {
              backgroundColor: colors.background,
            },
            headerShown: false,
            headerLeft: () => {
              return (
                <IconButton onPress={() => router.back()}>
                  <AntDesign name="left" size={24} color={colors.textMuted} />
                </IconButton>
              );
            },
          }}
        />
         <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: colors.background,
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
          headerLeft: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing.sm,
                }}
              >
                <IconButton onPress={() => router.back()}>
                  <AntDesign name="left" size={24} color={colors.icon} />
                </IconButton>
                <Text style={[styles.title, { fontSize: fontSize.base }]}>
                  Trending Albums
                </Text>
              </View>
            );
          },
        }}
      />
      </Stack>

      <FloatingPlayer
        container={{
          bottom: bottom,
        }}
      />
    </>
  );
};

export default AlbumLayout

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.SoraBold,
    fontSize: fontSize.lg,
    color: colors.text,
  },
});
