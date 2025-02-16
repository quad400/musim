import { Playlist, TrackMapper } from "@/interfaces";
import { getHotlist, getHotlistById } from "@/services/deezerServices";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMMKVObject } from "react-native-mmkv";
import { Playlist as PlaylistDeezer, Track } from "@/interfaces/dreezer";

export const usePlaylist = () => {
  const [playlists, setPlaylist] = useMMKVObject<Playlist[]>("playlist");

  const createPlaylist = (name: string) => {
    const playlistList = playlists || [];
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      image: null,
      tracks: [],
    };
    setPlaylist([...playlistList, newPlaylist]);
  };

  const deletePlaylist = (id: string) => {
    const playlistList = playlists || [];
    const newPlaylistList = playlistList.filter(
      (playlist) => playlist.id !== id
    );
    setPlaylist(newPlaylistList);
  };

  const addTrackToPlaylist = (playlistId: string, track: TrackMapper) => {
    const playlistList = playlists || [];
    const newPlaylistList = playlistList.map((playlist) => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          image: playlist.tracks.length === 0 ? track.artwork : playlist.image,
          tracks: [...playlist.tracks, track],
        };
      }
      return playlist;
    });
    setPlaylist(newPlaylistList);
  };

  const removeTrackFromPlaylist = (playlistId: string, trackId: number) => {
    const playlistList = playlists || [];
    const newPlaylistList = playlistList.map((playlist) => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          tracks: playlist.tracks.filter((track) => track.id !== trackId),
        };
      }
      return playlist;
    });
    setPlaylist(newPlaylistList);
  };

  const getPlaylistById = (id: string) => {
    return playlists?.find((playlist) => playlist.id === id);
  };

  return {
    playlists,
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
  };
};

export const useHotList = () => {
  const query = useInfiniteQuery({
    queryKey: ["hot-lists"], // Unique key for the query
    queryFn: getHotlist, // Function to fetch data
    getNextPageParam: (lastPage, allPages) => {
      // Return the next page number
      return allPages.length + 1;
    },
    initialPageParam: 1, // Initial page number
  });
  return query;
};

export const usePlaylistById = (id: string) => {
  const query = useQuery<unknown, unknown, PlaylistDeezer>({
    queryKey: ["playlist", id],
    queryFn: () => getHotlistById(id),
  });
  return query;
};
