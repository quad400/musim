import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { defaultStyles } from '@/constants/styles'
import { colors } from '@/constants/color';
import { fontSize, spacing } from '@/constants/sizes';
import { router } from 'expo-router';
import { LoopMode } from '@/interfaces';
import { unknownTrackImageUri } from '@/constants/images';
import { AntDesign, FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
import MovingText from '@/components/MovingText';
import { useProgress } from 'react-native-track-player';
import ProgressBar from '@/components/ProgressBar';
import { fonts } from '@/constants/fonts';
import { formatSecondsToMinutes } from '@/utils';
import AudioProgress from '@/components/AudioProgress';
import { useLoopMode, usePlayer } from '@/hooks/usePlayer';

const Player = () => {

    const { handlePlayPause, skipToNext, skipToPrevious, player, playing } = usePlayer();
    const { loop, setLoopMode } = useLoopMode();

    const { duration, position } = useProgress();
    const trackElapsedTime = formatSecondsToMinutes(duration)
    const trackRemainingTime = formatSecondsToMinutes(duration - position)

    const loopSwitch = () => {
        if (loop === LoopMode.NONE) {
            setLoopMode(LoopMode.QUEUE)
        } else if (loop === LoopMode.QUEUE) {
            setLoopMode(LoopMode.SINGLE)
        } else {
            setLoopMode(LoopMode.NONE)
        }
    }

    return (
        <LinearGradient colors={["#413543", "#2D2727", colors.background]} style={[defaultStyles.container, { padding: spacing.sm }]}>
            <View style={styles.dismissButtonContainer}>
                <Pressable onPress={() => router.back()} style={styles.dismissButton} />
            </View>
            <View style={styles.content}>
                <Image
                    source={{ uri: player?.artwork ?? unknownTrackImageUri }}
                    style={styles.artworkBanner}
                />
                <View style={styles.labelContent}>
                    <View style={styles.labelContainer}>
                        <MovingText text={player?.title ?? ""} animationThreshold={20} styles={styles.title} />
                        <Text style={styles.artist}>{player?.artist ?? "Unknown"}</Text>
                    </View>
                    <TouchableOpacity>
                        <AntDesign name="heart" size={24} color={"red"} />
                    </TouchableOpacity>
                </View>
                <View style={styles.sliderContainer}>
                    <ProgressBar
                        position={position}
                        duration={duration}
                    />
                    <View style={styles.labelContent}>
                        <Text style={styles.sliderLabel}>{trackElapsedTime}</Text>
                        <Text style={styles.sliderLabel}>{"- "}{trackRemainingTime}</Text>
                    </View>
                </View>
                <View style={styles.controlContainer}>
                    <TouchableOpacity onPress={skipToPrevious}>
                        <AntDesign name="banckward" size={28} color={colors.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePlayPause}>
                        <FontAwesome6 name={playing ? "pause" : "play"} size={48} color={colors.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={skipToNext}>
                        <AntDesign name="forward" size={28} color={colors.icon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.audioControlContainer}>
                    <TouchableOpacity>
                        <Ionicons name="volume-low" size={24} color={colors.icon} />
                    </TouchableOpacity>
                    <View style={{
                        flex: 1
                    }}>
                        <AudioProgress />
                    </View>
                    <TouchableOpacity>
                        <Ionicons name="volume-high" size={24} color={colors.icon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={loopSwitch}
                    style={{
                        marginTop: spacing.xl,
                        position: "relative",
                    }}>
                    <MaterialIcons name="repeat" size={35} color={loop !== LoopMode.NONE ? colors.primary : colors.text} />
                    {loop === LoopMode.SINGLE && <View style={{
                        position: "absolute",
                        top: -2,
                        right: -5,
                        backgroundColor: colors.icon,
                        height: 16,
                        width: 16,
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            color: colors.primary,
                            fontFamily: fonts.SoraSemiBold,
                            fontSize: fontSize.xs
                        }}>1</Text>
                    </View>}
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default Player

const styles = StyleSheet.create({
    dismissButtonContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    dismissButton: {
        width: 50,
        height: 10,
        backgroundColor: colors.minTrackTintColor,
        borderRadius: 5
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.base,
        marginTop: spacing.xl * 1.5,
        alignItems: "center"
    },
    artworkBanner: {
        width: "100%",
        height: spacing.height * 0.35,
        borderRadius: 20
    },
    labelContent: {
        marginTop: spacing.xl,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: spacing.lg
    },
    labelContainer: {
        flex: 1,
        gap: spacing.sm,
        overflow: "hidden"
    },
    title: {
        color: colors.text,
        fontSize: fontSize.lg,
        fontFamily: fonts.SoraSemiBold
    },
    artist: {
        color: colors.textMuted,
        fontSize: fontSize.md,
        fontFamily: fonts.SoraRegular
    },
    sliderContainer: {
        marginTop: spacing.xl,
        width: "100%"
    },
    sliderLabel: {
        fontFamily: fonts.SoraRegular,
        color: colors.textMuted,
        fontSize: fontSize.sm
    },
    controlContainer: {
        marginTop: spacing.xl,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%"
    },
    audioControlContainer: {
        marginTop: spacing.xl,
        flexDirection: "row",
        gap: spacing.sm,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    }
});