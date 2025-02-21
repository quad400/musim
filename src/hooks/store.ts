import { Artists, TrackMapper } from "@/interfaces";
import { Track } from "react-native-track-player";
import { create } from "zustand";

interface TrackStoreType {
    activePlayer: Track;
    setActivePlayer: (track: Track) => void;
}

export const useTrackStore = create<TrackStoreType>((set) => ({
    activePlayer: {} as Track,
    setActivePlayer: (track) => set({ activePlayer: track }),
}));


interface FavoriteStoreType {
    favoriteSongs: TrackMapper[];
    setFavoriteSongs: (songs: TrackMapper[]) => void;
}


export const useFavoriteStore = create<FavoriteStoreType>((set) => ({
    favoriteSongs: [],
    setFavoriteSongs: (songs) => set({ favoriteSongs: songs }),
}));
interface AppStoreType {
    favoriteSongs: Track[];
    setFavoriteSongs: (songs: Track[]) => void;
    artists: Artists[];
    setArtists: (artists: Artists[]) => void;
}

export const useAppStore = create<AppStoreType>((set) => ({
    favoriteSongs: [],
    setFavoriteSongs: (songs) => set({ favoriteSongs: songs }),
    artists: [],
    setArtists: (artists) => set({ artists }),
}));