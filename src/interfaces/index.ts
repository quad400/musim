import { Track } from "react-native-track-player";

export enum LoopMode {
    NONE,
    SINGLE,
    QUEUE
}

export interface Playlist {
    id: string;
    name: string;
    image: string | null | undefined;
    tracks: TrackMapper[]
}

export interface Artists {
    id: string;
    artist:string;
    tracks: Track[]
    // image: string | null | undefined;
}

export interface TrackMapper{
    id: number;
    title: string;
    artist: string;
    artwork: string;
    url: string;
    artwork_full: string;
}