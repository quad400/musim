import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect } from "react";
import {  useLocalSearchParams, useNavigation } from "expo-router";
import { usePlaylistById } from "@/hooks/usePlaylist";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/color";
import { fontSize, spacing } from "@/constants/sizes";
import PlaylistTrackItem from "@/components/playlists/PlaylistTrackItem";
import { fonts } from "@/constants/fonts";
import { unknownArtistImageUri } from "@/constants/images";
import PlayShuffle from "@/components/PlayShuffle";
import { Playlist } from "@/interfaces/dreezer";
import { useSelectTrack } from "@/hooks/usePlayer";
import { trackMapper } from "@/utils";
import { RefreshControl } from "react-native-gesture-handler";

const Page = () => {
  const { bottom } = useSafeAreaInsets();

  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, refetch, isRefetching } = usePlaylistById(id);
  const { handleSelectedTrack } = useSelectTrack(data?.tracks.data || []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: data?.title || "",
    });
  }, [navigation, data?.title]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={data?.tracks.data || []}
      contentContainerStyle={{

        flexGrow: 1,
        paddingBottom: bottom + 110,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.base,
        gap: spacing.sm,
      }}
      refreshControl={
        <RefreshControl
          tintColor={colors.primary}
          refreshing={isRefetching}
          onRefresh={refetch}
          colors={[colors.primary]}
        />
      }
      ListHeaderComponent={() => <HeaderComponent item={data} />}
      renderItem={({ item, index }) => (
        <PlaylistTrackItem
          onPress={() => handleSelectedTrack(item)}
          item={trackMapper(item)}
          key={index}
        />
      )}
    />
  );
};

export default Page;

const HeaderComponent = ({ item }: { item: Playlist | undefined }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item?.picture_big ? item.picture_big : unknownArtistImageUri }}
        style={styles.image}
      />
      <View style={styles.wrapper}>
        <Text style={[styles.title, { color: colors.textMuted }]}>
          {item?.creator?.name}
        </Text>
        <Text style={styles.title}>{item?.nb_tracks} Songs</Text>
      </View>
      <PlayShuffle
        tracks={item?.tracks.data.map((item) => trackMapper(item)) || []}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: spacing.base,
    resizeMode: "cover",
  },
  title: {
    fontSize: fontSize.md,
    color: colors.text,
    fontFamily: fonts.SoraSemiBold,
    marginVertical: spacing.base,
  },
});
