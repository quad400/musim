import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '@/constants/styles'
import { fontSize, spacing } from '@/constants/sizes'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import { colors } from '@/constants/colors'
import HorizontalSeparator from '@/components/HorizontalSeparator'
import TrackItem from '@/components/TrackItem'
import { data } from '@/constants/data'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TrackPlayer, { State, Track } from 'react-native-track-player'
import { useMMKVObject } from 'react-native-mmkv'
import { playAll, shuffleAll } from '@/services/playMicroService'
import { fonts } from '@/constants/fonts'

const Page = () => {

    const { bottom } = useSafeAreaInsets()

    const [_, setPlayer] = useMMKVObject<Track>("player")

    const [tracks] = useState(data)


    const handleSelectedTrack = async (item: Track) => {
        const trackIndex = data.findIndex((track) => track.url === item.url)

        if (trackIndex === -1) return

        const state = await TrackPlayer.getState();
        if (state === State.Playing) {
            console.log('The player is playing');
        };

        const beforeTracks = data.slice(0, trackIndex)
        const afterTracks = data.slice(trackIndex + 1)
        setPlayer(item)
        // console.log(beforeTracks, afterTracks)
        await TrackPlayer.reset()

        await TrackPlayer.add(item)
        await TrackPlayer.add(afterTracks)
        await TrackPlayer.add(beforeTracks)

        await TrackPlayer.play()

    }

    return (

        <FlatList
            contentInsetAdjustmentBehavior='automatic'
            data={tracks}
            contentContainerStyle={{
                paddingHorizontal: spacing.base,
                flexGrow: 1,
                paddingBottom: 100,
                backgroundColor: colors.background
            }}
            ItemSeparatorComponent={HorizontalSeparator}
            keyExtractor={(item, index) => index.toString()}
            indicatorStyle="default"
            ListHeaderComponent={() => (<HeaderComponent
                tracks={data}
            />)}
            renderItem={({ item, index }) => (
                <TrackItem
                    onPress={() => handleSelectedTrack(item)}
                    item={item} key={index} />
            )}
        />
    )
}

export default Page

const HeaderComponent = ({ tracks }: { tracks: Track[] }) => {


    return (
        <View
            style={[styles.containerRowCenter, {
                width: "100%",
                paddingVertical: spacing.sm,
                gap: spacing.sm,
            }]}
        >
            <TouchableOpacity
                onPress={() => playAll(tracks)}
                activeOpacity={0.6}
                style={[
                    styles.containerRowCenter,
                    {
                        backgroundColor: colors.backgroundAlt,
                        width: spacing.width / 2 - spacing.lg,
                        paddingVertical: spacing.base,
                        borderRadius: 15
                    }]}>
                <FontAwesome6 name="play" size={20} color={colors.primary} />
                <Text style={[styles.textIcon, { fontSize: fontSize.sm, fontFamily:fonts.SoraMedium }]}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => shuffleAll(tracks)}
                style={[
                    styles.containerRowCenter,
                    {
                        width: spacing.width / 2 - spacing.lg,
                        backgroundColor: colors.backgroundAlt,
                        paddingVertical: spacing.base,
                        borderRadius: 15
                    }]}>
                <Ionicons name="shuffle-sharp" size={24} color={colors.primary} />
                <Text style={[styles.textIcon, { fontSize: fontSize.sm, fontFamily:fonts.SoraMedium}]}>Shuffle</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    containerRowCenter: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    textIcon: {
        color: colors.primary,
        marginLeft: spacing.sm
    }
})