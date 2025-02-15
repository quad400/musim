import api from "./api";
import { TOP_ALBUMS, TOP_ARTISTS, TOP_PLAYLIST, TOP_TRACKS } from "./routes";

export const topTracks = async (genreId: number) => {
  const response = await api.get(TOP_TRACKS(genreId));
  return response.data.data || [];
};

export const topArtists = async (genreId: number) => {
  const response = await api.get(TOP_ARTISTS(genreId));
  return response.data.data || [];
};

export const topPlaylist = async (genreId: number) => {
  const response = await api.get(TOP_PLAYLIST(genreId));
  return response.data.data || [];
};

export const topAlbum = async (genreId: number) => {
  const response = await api.get(TOP_ALBUMS(genreId));
  return response.data.data || [];
};
