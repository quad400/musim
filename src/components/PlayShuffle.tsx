import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { fontSize, spacing } from "@/constants/sizes";
import { playAll, shuffleAll } from "@/services/playMicroService";
import { colors } from "@/constants/color";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { fonts } from "@/constants/fonts";
import { TrackMapper } from "@/interfaces";

const PlayShuffle = ({ tracks }: { tracks: TrackMapper[] }) => {
  return (
    <View
      style={[
        styles.containerRowCenter,
        {
          width: "100%",
          paddingVertical: spacing.sm,
          gap: spacing.sm,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => playAll(tracks)}
        activeOpacity={0.6}
        style={[
          styles.containerRowCenter,
          {
            backgroundColor: colors.backgroundAlt,
            flex: 1,
            paddingVertical: spacing.base,
            borderRadius: 15,
          },
        ]}
        
      >
        <FontAwesome6 name="play" size={20} color={colors.primary} />
        <Text
          style={[
            styles.textIcon,
            { fontSize: fontSize.sm, fontFamily: fonts.SoraMedium },
          ]}
        >
          Play
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => shuffleAll(tracks)}
        style={[
          styles.containerRowCenter,
          {
            flex: 1,
            backgroundColor: colors.backgroundAlt,
            paddingVertical: spacing.base,
            borderRadius: 15,
          },
        ]}
      >
        <Ionicons name="shuffle-sharp" size={24} color={colors.primary} />
        <Text
          style={[
            styles.textIcon,
            { fontSize: fontSize.sm, fontFamily: fonts.SoraMedium },
          ]}
        >
          Shuffle
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayShuffle;
const styles = StyleSheet.create({
  containerRowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textIcon: {
    color: colors.primary,
    marginLeft: spacing.sm,
  },
});
