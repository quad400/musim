import api from "./api";
import { GET_ARTIST, GET_HOTLIST, GET_HOTLIST_BY_ID, TOP_ALBUMS, TOP_ARTISTS, TOP_PLAYLIST, TOP_TRACKS } from "./routes";

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

export const getArtists = async ({pageParam=1})=>{
    const response = await api.get(GET_ARTIST(pageParam))
    return response.data.data || [] 
}

export const getHotlist = async ({pageParam=1})=>{
    const response = await api.get(GET_HOTLIST(pageParam))
    return response.data.data || [] 
}

export const getHotlistById = async (id: string)=>{
    const response = await api.get(GET_HOTLIST_BY_ID(id))
    return response.data || {}
}