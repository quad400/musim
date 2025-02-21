import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { fontSize, spacing } from "@/constants/sizes";
import { fonts } from "@/constants/fonts";
import { colors } from "@/constants/color";
import { Album } from "@/interfaces/dreezer";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const AlbumCard = ({ item }: { item: Album }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/albums/${item.id}`)}
      activeOpacity={0.4}
      style={styles.container}
    >
      <View style={styles.wrapper}>
        <Image style={styles.image} source={{ uri: item.cover_medium }} />
        <Text 
        numberOfLines={1} 
        ellipsizeMode="tail"
        style={styles.title}>{item.title}</Text>
      </View>
      <AntDesign name="right" size={24} color={colors.text} />
    </TouchableOpacity>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    paddingRight: spacing.base,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.base,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: spacing.base,
  },
  title: {
    flex: 1,
    fontFamily: fonts.SoraMedium,
    fontSize: fontSize.md,
    color: colors.text,
  },
});
