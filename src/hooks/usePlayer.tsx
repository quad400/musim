import { LoopMode } from "@/interfaces"
import { useEffect, useState } from "react"
import { useMMKVObject } from "react-native-mmkv"
import TrackPlayer, { RepeatMode, Track, useActiveTrack, useIsPlaying } from "react-native-track-player"


export const usePlayer = () => {

    const [player, setPlayer] = useMMKVObject<Track>("player")
    const { playing } = useIsPlaying()
    const activeTrack = useActiveTrack()
    // console.log(progress)
    useEffect(() => {
        if (activeTrack) {
            setPlayer(activeTrack)
        }
    }, [activeTrack])


    const handlePlayPause = () => {
        if (playing) {
            TrackPlayer.pause()
        } else {
            TrackPlayer.play()
        }
    }

    const skipToNext = () => {
        TrackPlayer.skipToNext()
        setPlayer(activeTrack)
    }

    const skipToPrevious = () => {
        TrackPlayer.skipToPrevious()
        setPlayer(activeTrack)
    }

    return {
        handlePlayPause,
        skipToNext,
        skipToPrevious,
        player,
        playing
    }
}

export const useLoopMode = () => {
    const [loop, setLoop] = useState<LoopMode>(LoopMode.NONE)

    const setLoopMode = async (mode: LoopMode) => {
        if (mode === LoopMode.NONE) {
            await TrackPlayer.setRepeatMode(RepeatMode.Off)
            setLoop(mode)
            return
        } else if (mode === LoopMode.SINGLE) {
            await TrackPlayer.setRepeatMode(RepeatMode.Track)
            setLoop(mode)
            return
        } else {
            await TrackPlayer.setRepeatMode(RepeatMode.Queue)
            setLoop(mode)
            return
        }
    }
    return {
        loop,
        setLoopMode
    }
}