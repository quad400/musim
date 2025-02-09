import { colors } from "@/constants/colors"
import { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { Slider } from "react-native-awesome-slider"
import { useSharedValue } from "react-native-reanimated"
import TrackPlayer from "react-native-track-player"


const AudioProgress = () => {

    const [volume, setVolume] = useState<number | undefined>(0)

    const getVolume = async () => {
        const volume = await TrackPlayer.getVolume()
        setVolume(volume)
    }

    const setVolumeTo = async (value: number) => {
        await TrackPlayer.setVolume(value)
        setVolume(value)
    }

    useEffect(() => {
        getVolume()
    }, [volume])

    useEffect(() => {
        progress.value = volume ?? 0
    },[volume])

    const progress = useSharedValue(0)
    const min = useSharedValue(0)
    const max = useSharedValue(1)

    // console.log(volume)

    return (
        <Slider
            progress={progress}
            containerStyle={styles.containerStyle}
            thumbWidth={0}
            minimumValue={min}
            theme={{
                minimumTrackTintColor: colors.minTrackTintColor,
                maximumTrackTintColor: colors.maxTrackTintColor,
            }}
            maximumValue={max}
            onValueChange={(value) => {
                setVolumeTo(value)
            }}
           
        />
    )
}

export default AudioProgress

const styles = StyleSheet.create({
    containerStyle: {
        width: "100%",
        height: 8,
        borderRadius: 5
    }
})