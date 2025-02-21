import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { defaultStyles } from "@/constants/styles";
import { colors } from "@/constants/color";
import { AntDesign } from "@expo/vector-icons";
import { fontSize, spacing } from "@/constants/sizes";
import FloatingPlayer from "@/components/FloatingPlayer";
import { fonts } from "@/constants/fonts";
import IconButton from "@/components/buttons/IconButton";

const Layout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "",
            headerLeft: () => {
              return (
                <View>
                  <Text style={styles.title}>Browse</Text>
                </View>
              );
            },
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleAlign: "left",
            contentStyle: {
              backgroundColor: colors.background,
            },
            headerRight: () => (
              <IconButton onPress={() => router.push("/search")}>
                <AntDesign name="search1" size={24} color={colors.icon} />
              </IconButton>
            ),
          }}
        />
        <Stack.Screen
          name="trending-now"
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
                    Trending Now
                  </Text>
                </View>
              );
            },
          }}
        />
        <Stack.Screen
          name="hot-list/index"
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
                    Hotlist
                  </Text>
                </View>
              );
            },
          }}
        />
        <Stack.Screen
          name="hot-list/[id]"
          
          options={{
            headerTitleStyle:{
              color: colors.text,
              fontFamily: fonts.SoraBold,
              fontSize: fontSize.base
            },
            headerStyle: {
              backgroundColor: colors.background,
            },
            contentStyle: {
              backgroundColor: colors.background,
            },
            headerTitleAlign: "center",
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
                </View>
              );
            },
          }}
        />
      </Stack>
      <FloatingPlayer />
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.SoraBold,
    fontSize: fontSize.lg,
    color: colors.text,
  },
});
