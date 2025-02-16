import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { usePlaylistById } from "@/hooks/usePlaylist";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/color";
import { fontSize, spacing } from "@/constants/sizes";
import PlaylistTrackItem from "@/components/playlists/PlaylistTrackItem";
import { fonts } from "@/constants/fonts";
import { unknownArtistImageUri } from "@/constants/images";
import PlayShuffle from "@/components/PlayShuffle";
import { Playlist, Track } from "@/interfaces/dreezer";
import { useSelectTrack } from "@/hooks/usePlayer";
import { trackMapper } from "@/utils";

const Page = () => {
  const { bottom } = useSafeAreaInsets();

  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isFetching } = usePlaylistById(id);
  const { handleSelectedTrack } = useSelectTrack(data?.tracks.data || []);

  console.log(data?.tracks);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: data?.title || "",
    });
  }, [navigation, data?.title]);

  if (!data) return null;

  return (
    <FlatList
      data={data.tracks.data || []}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: bottom + 20,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.base,
        gap: spacing.sm,
      }}
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

const HeaderComponent = ({
  item,
}: {
  item: Playlist
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item?.picture ? item.picture : unknownArtistImageUri }}
        style={styles.image}
      />
      <Text style={styles.title}>{item?.title}</Text>
      <PlayShuffle tracks={item?.tracks.data.map((item)=>trackMapper(item)) || []} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: spacing.base,
    resizeMode: "cover",
  },
  title: {
    fontSize: fontSize.lg,
    color: colors.text,
    fontFamily: fonts.SoraSemiBold,
    marginVertical: spacing.base,
  },
});
