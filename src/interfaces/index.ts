import { Track } from "react-native-track-player"

export enum LoopMode {
    NONE,
    SINGLE,
    QUEUE
}

export interface Playlist {
    id: string;
    name: string;
    image: string | null | undefined;
    tracks: Track[]
}

export interface Artists {
    id: string;
    artist:string;
    tracks: Track[]
    // image: string | null | undefined;
}