import React, { useEffect } from "react";
import { useSharedValue } from "react-native-reanimated";
import { Slider } from 'react-native-awesome-slider';
import { colors } from "@/constants/color";
import { StyleSheet } from "react-native";
import { formatSecondsToMinutes } from "@/utils";
import TrackPlayer from "react-native-track-player";


interface ProgressBarProps {
    position: number;
    duration: number;
}

const ProgressBar = ({ duration, position }: ProgressBarProps) => {
    const progress = useSharedValue(0);
    const min = useSharedValue(0);
    const max = useSharedValue(1);
    const isSliding = useSharedValue(false)

    useEffect(() => {
        if (!isSliding.value) {
            progress.value = duration > 0 ? position / duration : 0
        }
    }, [duration, position]);


    return <Slider
        progress={progress}
        containerStyle={styles.containerStyle}
        thumbWidth={0}
        minimumValue={min}
        theme={{
            minimumTrackTintColor: colors.minTrackTintColor,
            maximumTrackTintColor: colors.maxTrackTintColor,
        }}
        maximumValue={max}
        onSlidingStart={() => isSliding.value = true}
        onValueChange={async(value) => {
            await TrackPlayer.seekTo(value * duration)
        }}
        onSlidingComplete={async() => {
            
            if(!isSliding.value) return
            isSliding.value = false
            
            await TrackPlayer.seekTo(progress.value * duration)
        }}
    />;
};

export default ProgressBar;

const styles = StyleSheet.create({
    containerStyle: {
        width: "100%",
        height: 8,
        borderRadius: 5
    }
})