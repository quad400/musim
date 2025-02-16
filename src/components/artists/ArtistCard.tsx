import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Artist } from "@/interfaces/dreezer";
import FastImage from "react-native-fast-image";
import { fonts } from "@/constants/fonts";
import { colors } from "@/constants/color";
import { fontSize } from "@/constants/sizes";

const ArtistCard = ({ item }: { item: Artist }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <FastImage source={{ uri: item.picture_medium }} style={styles.image} />
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ArtistCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontFamily: fonts.SoraSemiBold,
    marginTop: 10,
  },
});
