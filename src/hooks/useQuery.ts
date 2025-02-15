import { Album, Artist, Playlist, Track } from "@/interfaces/dreezer";
import {
  topAlbum,
  topArtists,
  topPlaylist,
  topTracks,
} from "@/services/deezerServices";
import { useQuery } from "@tanstack/react-query";

export const useTopTracks = (genreId: number) => {
  const query = useQuery<unknown, unknown, Track[]>({
    queryKey: ["topTracks"],
    queryFn: () => topTracks(genreId),
    staleTime: 1000 * 60 * 60 * 24,
  });
  return query;
};

export const useTopArtists = (genreId: number) => {
  const query = useQuery<unknown, unknown, Artist[]>({
    queryKey: ["topArtists"],
    queryFn: () => topArtists(genreId),
    staleTime: 1000 * 60 * 60 * 24,
  });
  return query;
};

export const useTopPlaylist = (genreId: number) => {
  const query = useQuery<unknown, unknown, Playlist[]>({
    queryKey: ["topPlaylist"],
    queryFn: () => topPlaylist(genreId),
    staleTime: 1000 * 60 * 60 * 24,
  });
  return query;
};

export const useTopAlbum = (genreId: number) => {
  const query = useQuery<unknown, unknown, Album[]>({
    queryKey: ["topAlbum"],
    queryFn: () => topAlbum(genreId),
    staleTime: 1000 * 60 * 60 * 24,
  });
  return query;
};
