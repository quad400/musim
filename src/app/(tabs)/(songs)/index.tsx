import { RefreshControl, ScrollView } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import Genres from "@/components/Genres";
import TopTracks from "@/components/tracks/TopTracks";
import TopArtists from "@/components/artists/TopArtists";
import TopPlaylist from "@/components/playlists/TopPlaylists";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TopAlbum from "@/components/albums/TopAlbum";
import {
  useTopAlbum,
  useTopArtists,
  useTopPlaylist,
  useTopTracks,
} from "@/hooks/useQuery";
import NoInternetError from "@/components/NoInternetError";
import { colors } from "@/constants/color";

const Songs = () => {
  const [selectedGenre, setSelectedGenre] = useState(0);
  const { bottom } = useSafeAreaInsets();

  const {
    isError: isAlbumError,
    refetch: refetchAlbum,
    isRefetching: isRefetchingAlbum,
  } = useTopAlbum(selectedGenre);
  const {
    isError: isArtistError,
    refetch: refetchArtists,
    isRefetching: isRefetchingArtist,
  } = useTopArtists(selectedGenre);
  const {
    isError: isPlaylistError,
    refetch: refetchPlaylist,
    isRefetching: isRefetchingPlaylist,
  } = useTopPlaylist(selectedGenre);
  const {
    isError: isTrackError,
    refetch: refetchTracks,
    isRefetching: isRefetchingTracks,
  } = useTopTracks(selectedGenre);

  const handleRefresh = useCallback(() => {
    refetchAlbum();
    refetchArtists();
    refetchPlaylist();
    refetchTracks();
  }, [refetchAlbum, refetchArtists, refetchPlaylist, refetchTracks]);

  const isRefreshing = useMemo(() => {
    return (
      isRefetchingAlbum &&
      isRefetchingArtist &&
      isRefetchingPlaylist &&
      isRefetchingTracks
    );
  }, [
    isRefetchingAlbum,
    isRefetchingArtist,
    isRefetchingPlaylist,
    isRefetchingTracks,
  ]);

  if (isAlbumError || isArtistError || isPlaylistError || isTrackError) {
    return <NoInternetError reload={handleRefresh} />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl
          tintColor={colors.primary}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          colors={[colors.primary]}
        />
      }
      contentContainerStyle={{
        paddingBottom: bottom + 100,
      }}
    >
      <Genres selected={selectedGenre} setSelected={setSelectedGenre} />
      <TopTracks genreId={selectedGenre} />
      <TopArtists genreId={selectedGenre} />
      <TopPlaylist genreId={selectedGenre} />
      <TopAlbum genreId={selectedGenre} />
    </ScrollView>
  );
};

export default Songs;
