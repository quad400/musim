import {
  ActivityIndicator,
  Animated,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  useAlbum,
  useArtist,
  useArtistAlbums,
  useArtistTracks,
} from "@/hooks/useArtist";
import { fontSize, spacing } from "@/constants/sizes";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@/constants/color";
import { fonts } from "@/constants/fonts";
import { LinearGradient } from "expo-linear-gradient";
import { formatNumber, trackMapper } from "@/utils";
import PlayShuffle from "@/components/PlayShuffle";
import TextButton from "@/components/TextButton";
import TrackItem from "@/components/tracks/TrackItem";
import { useSelectTrack } from "@/hooks/usePlayer";
import { Album, Track } from "@/interfaces/dreezer";
import AlbumCard from "@/components/albums/AlbumCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { bottom } = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const { data, isLoading, refetch, isRefetching } = useAlbum(id);

  const tracks = data?.tracks?.data || [];

  const { handleSelectedTrack } = useSelectTrack(tracks);

  const handleRefresh = () => {
    refetch();
  };

  const headerBarOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [100, 300],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <View>
        <Animated.View
          style={[
            styles.headerBanner,
            { opacity: headerBarOpacity }, // Animated opacity
          ]}
        />
        <View
          style={[
            styles.headerBanner,
            {
              backgroundColor: "transparent",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-start",
            },
          ]}
        >
          <View
            style={{
              width:"100%",
              justifyContent: "flex-start",
              flexDirection: "row",
              gap: spacing.sm,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ padding: 10 }}
            >
              <AntDesign name="left" size={24} color={colors.icon} />
            </TouchableOpacity>


            <Animated.Text
              style={{
                fontFamily: fonts.SoraSemiBold,
                fontSize: fontSize.base,
                color: colors.text,
                opacity: headerTitleOpacity,
              }}
            >
              {data?.title}
            </Animated.Text>
          </View>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              tintColor={colors.primary}
              refreshing={isRefetching}
              colors={[colors.primary]}
              onRefresh={handleRefresh}
            />
          }
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={26}
          contentContainerStyle={{
            paddingBottom: bottom + 60,
          }}
        >
          <ImageBackground
            source={{
              uri: data?.cover_xl,
            }}
            style={styles.imageBackground}
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)"]}
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "flex-start",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: fonts.SoraBold,
                    fontSize: fontSize.lg,
                    color: colors.text,
                    paddingLeft: spacing.base,
                  }}
                >
                  {data?.title}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 1,
                    height: 20,
                    backgroundColor: colors.textMuted,
                  }}
                />
              </View>
            </LinearGradient>
          </ImageBackground>
          <View
            style={{
              padding: spacing.base,
            }}
          >
            <PlayShuffle
              tracks={tracks.map((item: Track) => trackMapper(item))}
            />
          </View>
          <View style={{ padding: spacing.base, gap: spacing.base }}>
            <Text
              style={{
                fontFamily: fonts.SoraBold,
                fontSize: fontSize.base,
                color: colors.text,
              }}
            >
              Tracks ({data?.nb_tracks})
            </Text>
            <View>
              {tracks?.map((item: Track) => (
                <TrackItem
                  onPress={handleSelectedTrack}
                  key={item.id}
                  item={item}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: spacing.height / 2.5,
  },
  headerBanner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width:"100%",
    zIndex: 1,
    height: 100,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
