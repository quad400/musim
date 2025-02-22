import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { unknownArtistImageUri } from "@/constants/images";
import { fontSize } from "@/constants/sizes";
import { fonts } from "@/constants/fonts";
import { colors } from "@/constants/color";
import { router } from "expo-router";
import { Artist } from "@/interfaces/dreezer";

const ArtistItem = ({ item }: { item: Artist }) => {
  const handlePress = (item: Artist) => {
    router.push({
      pathname: "/(tabs)/artists/[id]",
      params: { id: item.id, tracks: JSON.stringify(item) },
    });
  };


  return (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={styles.container}
    >
      <Image source={{ uri: unknownArtistImageUri }} style={styles.image} />
      <View>
        <Text
          style={{
            fontSize: fontSize.md,
            fontFamily: fonts.SoraMedium,
            color: colors.text,
          }}
        >
          {item.name}
        </Text>
        {/* <Text style={styles.text}>{item.tracks.length} Songs</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default ArtistItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontFamily: fonts.SoraRegular,
  },
});
