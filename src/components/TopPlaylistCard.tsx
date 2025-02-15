import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Playlist, Track } from "@/interfaces/dreezer";
import { fontSize, spacing } from "@/constants/sizes";
import { fonts } from "@/constants/fonts";
import { colors } from "@/constants/color";

const TopPlaylistCard = ({ item }: { item: Playlist }) => {
  return (
    <TouchableOpacity activeOpacity={0.4} style={styles.container}>
      <Image source={{ uri: item.picture_medium }} style={styles.imageCard} />
      <View style={styles.wrapper}>
        <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.artist} ellipsizeMode="tail" numberOfLines={1}>
          {item.user.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TopPlaylistCard;

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  imageCard: {
    width: spacing.width * 0.37,
    height: spacing.height * 0.2,
    borderRadius: spacing.sm,
  },
  wrapper: {
    width: spacing.width * 0.37,
  },
  title: {
    fontFamily: fonts.SoraSemiBold,
    fontSize: fontSize.md,
    color: colors.text,
  },
  artist: {
    fontFamily: fonts.SoraMedium,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
});
