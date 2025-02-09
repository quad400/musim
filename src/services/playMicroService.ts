import { shuffleArray } from "@/utils/algorithm";
import TrackPlayer, { Track } from "react-native-track-player";


export const playAll = async (tracks: Track[]) => {
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
    await TrackPlayer.play();
}

export const shuffleAll = async (tracks: Track[]) => {

    const queue = await TrackPlayer.getQueue()
    if (queue.length === 0) return;

    const shuffledQueue = shuffleArray(queue)

    await TrackPlayer.stop()
    await TrackPlayer.reset();
    
    await TrackPlayer.add(shuffledQueue);
    await TrackPlayer.play();
}