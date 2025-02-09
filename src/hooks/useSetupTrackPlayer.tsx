import { useEffect, useRef } from 'react';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';

const setupPlayer = async () => {
    await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10,
        // minBuffer: 5,
        // maxBuffer: 10,
        // waitForBuffer: true
    });
    await TrackPlayer.setVolume(0.3);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export const useSetupTrackPlayer = ({onLoad}:{onLoad?:()=>void}) => {
    const isInitialized = useRef(false);

    useEffect(() => {
        setupPlayer().then(() => {
            isInitialized.current = true;
            onLoad?.()
        }).catch(e => {
            isInitialized.current = false;
            console.log("Error setting up player", e)
        })
    }, [])
}