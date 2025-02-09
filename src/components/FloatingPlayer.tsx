import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/color'
import { unknownTrackImageUri } from '@/constants/images'
import { fontSize, spacing } from '@/constants/sizes'
import { AntDesign, FontAwesome6 } from '@expo/vector-icons'
import MovingText from './MovingText'
import { useRouter } from 'expo-router'
import { useActiveTrack } from 'react-native-track-player'
import { fonts } from '@/constants/fonts'
import { usePlayer } from '@/hooks/usePlayer'

const FloatingPlayer = () => {

    const router = useRouter()
    const activeTrack = useActiveTrack()

    const { handlePlayPause, player, playing, skipToNext, skipToPrevious } = usePlayer()
   
    const handlePress = () => {
        router.navigate("/player")
    }

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.container, { display: player ? "flex" : "none" }]}>
            <View style={styles.wrapper}>
                <Image
                    source={{ uri: player?.artwork ?? unknownTrackImageUri }}
                    height={50}
                    width={50}
                    style={{
                        borderRadius: 10
                    }}
                />
                <View style={styles.textContainer}>
                    <MovingText text={player?.title ?? ""} animationThreshold={20} styles={styles.title} />
                    <Text style={styles.trackName}>{player?.artist}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={skipToPrevious} style={styles.icon}>
                        <AntDesign name="banckward" size={20} color={colors.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePlayPause} style={styles.icon}>
                        <FontAwesome6 name={playing ? "pause" : "play"} size={playing ? 20 : 18} color={colors.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={skipToNext} style={styles.icon}>
                        <AntDesign name="forward" size={20} color={colors.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default FloatingPlayer

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 88,
        left: 0,
        right: 0,
        width: "100%",
        height: 65
    },
    wrapper: {
        flex: 1,
        backgroundColor: colors.backgroundAlt,
        borderRadius: 10,
        width: "100%",
        height: "100%",
        flexDirection: "row",
        paddingHorizontal: spacing.sm,
        justifyContent: "space-between",
        alignItems: "center"
    },
    textContainer: {
        marginLeft: 10,
        overflow: "hidden",
        flex: 1
    },
    title: {
        fontFamily: fonts.SoraBold,
        fontSize: fontSize.md,
        color: colors.text,
    },
    trackName: {
        fontFamily: fonts.SoraRegular,
        fontSize: fontSize.sm,
        color: colors.textMuted
    },
    imageTextContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5
    },
    icon: {
        padding: 8
    }
})