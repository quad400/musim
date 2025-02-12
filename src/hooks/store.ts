import { Artists } from "@/interfaces";
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


interface AppStoreType {
    songs: Track[];
    setSongs: (songs: Track[]) => void;
    favoriteSongs: Track[];
    setFavoriteSongs: (songs: Track[]) => void;
    artists: Artists[];
    setArtists: (artists: Artists[]) => void;
}

export const useAppStore = create<AppStoreType>((set) => ({
    songs: [],
    setSongs: (songs) => set({ songs }),
    favoriteSongs: [],
    setFavoriteSongs: (songs) => set({ favoriteSongs: songs }),
    artists: [],
    setArtists: (artists) => set({ artists }),
}));