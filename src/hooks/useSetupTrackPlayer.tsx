import { useMMKVObject } from 'react-native-mmkv';
import TrackPlayer, { RepeatMode, Track } from 'react-native-track-player';

export const setupPlayer = async () => {
    await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10,
        minBuffer: 5,
        maxBuffer: 10,
        waitForBuffer: true
    });
    await TrackPlayer.setVolume(0.3);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}


export const useInitializePlayer = () => {
    const [player] = useMMKVObject<Track>("player")
    console.log("Player", player)
    const initializePlayer = async () => {
        if (!player) {
            return
        }
        // await setupPlayer()
        await TrackPlayer.add(player)
    }

    return {initializePlayer}
}