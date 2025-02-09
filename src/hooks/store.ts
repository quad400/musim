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