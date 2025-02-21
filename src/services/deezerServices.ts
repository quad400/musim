import axios from "axios";
import api from "./api";
import {
  GET_ALBUM,
  GET_ALBUM_BY_ARTIST,
  GET_ARTIST,
  GET_ARTISTS,
  GET_HOTLIST,
  GET_HOTLIST_BY_ID,
  GET_TRACKS_BY_ARTIST,
  GET_TRENDING_ALBUM,
  TOP_ALBUMS,
  TOP_ARTISTS,
  TOP_PLAYLIST,
  TOP_TRACKS,
} from "./routes";
import { SearchType } from "@/interfaces/dreezer";

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

export const getArtists = async ({ pageParam}:any) => {
  const response = await api.get(GET_ARTISTS(pageParam));
  return { ...response.data, currentIndex: pageParam };
};

export const getHotlist = async ({ pageParam = 1 }) => {
  const response = await api.get(GET_HOTLIST(pageParam));
  return response.data.data || [];
};

export const getTrendingAlbum = async ({ pageParam = 1 }) => {
  const response = await api.get(GET_TRENDING_ALBUM(pageParam));
  return response.data.data || [];
};

export const getHotlistById = async (id: string) => {
  const response = await api.get(GET_HOTLIST_BY_ID(id));
  return response.data || {};
};

export const getArtist = async (id: string) => {
  const response = await api.get(GET_ARTIST(id));
  return response.data || {};
};

export const getTracksByArtist = async ({ pageParam, queryKey }: any) => {
  const artistId = queryKey[1]; // Get artistId from queryKey
  const url = `https://api.deezer.com/artist/${artistId}/top?index=${pageParam}&limit=${10}`;
  
  const response = await axios.get(url);
  return { ...response.data, currentIndex: pageParam };
};

export const getAlbumsByArtist = async ({ pageParam, queryKey }: any) => {
  const artistId = queryKey[1]; // Get artistId from queryKey
  const url = `https://api.deezer.com/artist/${artistId}/albums?index=${pageParam}&limit=${10}`;
  
  const response = await axios.get(url);
  return { ...response.data, currentIndex: pageParam };
};

export const getAlbum = async (id: string) => {
  const response = await api.get(GET_ALBUM(id));
  return response.data || {};
};


export const search = async (query: string, type:SearchType) => {
  let url =""

  switch (type) {
    case "album":
      url = `search/album?q=${query}`;
      break;
    case "artist":
      url = `search/artist?q=${query}`;
      break;
    case "playlist":
      url = `search/playlist?q=${query}`;
      break;
    case "track":
      url = `search/track?q=${query}`;
      break;
    default:
      url = `search?q=${query}`;
      break;
  }

  const response = await api.get(url);
  return response.data.data || [];
};
