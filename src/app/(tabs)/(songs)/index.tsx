import { ScrollView } from "react-native";
import React, { useState } from "react";
import { useSearchLayout } from "@/hooks/useSearchLayout";
import Genres from "@/components/Genres";
import TopTracks from "@/components/TopTracks";
import TopArtists from "@/components/TopArtists";
import TopPlaylist from "@/components/TopPlaylists";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TopAlbum from "@/components/TopAlbum";

const Songs = () => {
  const [selectedGenre, setSelectedGenre] = useState(0);
  const { bottom } = useSafeAreaInsets();
  console.log(selectedGenre)

  //   const search = useSearchLayout({
  //     searchBarOptions: {
  //       placeholder: "Find in songs",
  //     },
  //   });

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        flexGrow: 1,
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
