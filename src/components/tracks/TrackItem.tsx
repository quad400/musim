import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { fontSize, spacing } from "@/constants/sizes";
import { colors } from "@/constants/color";
import { unknownTrackImageUri } from "@/constants/images";
import { useActiveTrack, useIsPlaying } from "react-native-track-player";
import { fonts } from "@/constants/fonts";
import LoaderKit from "react-native-loader-kit";
import { StopPropagation } from "../StopPropagation";
import MenuContent from "../MenuContent";
import FastImage from "react-native-fast-image";
import { Track } from "@/interfaces/dreezer";
import { trackMapper } from "@/utils";

const TrackItem = ({
  item,
  onPress,
}: {
  item: Track;
  onPress: (item: Track) => void;
}) => {
  const activeTrack = useActiveTrack();
  const { playing } = useIsPlaying();


  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.5}
      style={styles.container}
    >
      <View style={styles.wrapper}>
        <FastImage
          source={{
            uri: item.album.cover ?? unknownTrackImageUri,
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
        >
          {activeTrack?.preview === item.preview && playing && (
            <LoaderKit
              style={{ width: 20, height: 20, zIndex: 10 }}
              name={"LineScalePulseOut"}
              color={colors.text}
            />
          )}
          {activeTrack?.preview === item.preview && playing && (
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: spacing.sm,
                position: "absolute",
                backgroundColor: "#00000050",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          )}
        </FastImage>
        <View style={{ marginRight: spacing.sm, flex: 1 }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.text}>{item.artist.name}</Text>
        </View>
      </View>
      <StopPropagation>
        <MenuContent item={trackMapper(item)} />
      </StopPropagation>
    </TouchableOpacity>
  );
};

export default TrackItem;

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
