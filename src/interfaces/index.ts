import { Track } from "react-native-track-player"

export enum LoopMode {
    NONE,
    SINGLE,
    QUEUE
}

export interface Playlist {
    id: string;
    name: string;
    image: string | null;
    tracks: Track[]
}