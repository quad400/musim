import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { fontSize, spacing } from "@/constants/sizes";
import { colors } from "@/constants/color";
import { unknownTrackImageUri } from "@/constants/images";
import { fonts } from "@/constants/fonts";
import FastImage from "react-native-fast-image";
import { Playlist } from "@/interfaces/dreezer";
import { router } from "expo-router";

const HotlistItem = ({
  item,
}: {
  item: Playlist;
}) => {

  return (
    <TouchableOpacity
      onPress={() => router.push(`/hot-list/${item.id}`)}
      activeOpacity={0.5}
      style={styles.container}
    >
      <View style={styles.wrapper}>
        <FastImage
          source={{
            uri: item.picture_big ?? unknownTrackImageUri,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
          style={[
            styles.image,
            {
              justifyContent: "center",
              alignItems: "center",
              borderRadius: spacing.sm,
              overflow: "hidden",
            },
          ]}
        />

        <View style={{ marginRight: spacing.sm, flex: 1 }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.text}>{item.nb_tracks} Songs</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotlistItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    resizeMode: "cover",
  },
  title: {
    fontSize: fontSize.md,
    fontFamily: fonts.SoraSemiBold,
    color: colors.text,
  },
  text: {
    fontSize: fontSize.sm,
    fontFamily: fonts.SoraRegular,
    color: colors.textMuted,
  },
});
