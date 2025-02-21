import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Artist } from "@/interfaces/dreezer";
import { fonts } from "@/constants/fonts";
import { fontSize, spacing } from "@/constants/sizes";
import { colors } from "@/constants/color";
import { router } from "expo-router";

const TopArtistCard = ({ item }: { item: Artist }) => {
  return (
    <TouchableOpacity onPress={()=>router.push(`/artists/${item.id}`)} activeOpacity={0.4} style={styles.container}>
      <Image source={{ uri: item.picture_medium }} style={styles.imageCard} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default TopArtistCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.backgroundAlt,
    gap: 10,
    borderRadius:spacing.xl,
    paddingRight: spacing.base,
    alignItems: "center",
  },
  imageCard: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    fontFamily: fonts.SoraMedium,
    fontSize: fontSize.md,
    color: colors.text,
  },
});
