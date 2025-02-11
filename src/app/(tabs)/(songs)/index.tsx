import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { fontSize, spacing } from '@/constants/sizes'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import { colors } from '@/constants/color'
import HorizontalSeparator from '@/components/HorizontalSeparator'
import TrackItem from '@/components/TrackItem'
import { tracks } from '@/constants/data'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TrackPlayer, { State, Track } from 'react-native-track-player'
import { playAll, shuffleAll } from '@/services/playMicroService'
import { fonts } from '@/constants/fonts'
import { useSelectTrack } from '@/hooks/usePlayer'
import EmptyList from '@/components/EmptyList'

const Songs = () => {

    const { bottom } = useSafeAreaInsets()

    const { handleSelectedTrack } = useSelectTrack(tracks)


    return (

        <FlatList
            contentInsetAdjustmentBehavior='automatic'
            data={tracks}
            contentContainerStyle={{
                paddingHorizontal: spacing.base,
                flexGrow: 1,
                paddingBottom: bottom + 100,
                backgroundColor: colors.background
            }}
            ItemSeparatorComponent={HorizontalSeparator}
            keyExtractor={(item, index) => index.toString()}
            indicatorStyle="default"
            ListHeaderComponent={() => (<HeaderComponentPlayer
                tracks={tracks}
            />)}
            renderItem={({ item, index }) => (
                <TrackItem
                    onPress={() => handleSelectedTrack(item)}
                    item={item} key={index} />
            )}
        />
    )
}

export default Songs

export const HeaderComponentPlayer = ({ tracks }: { tracks: Track[] }) => {
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
                        flex: 1,
                        paddingVertical: spacing.base,
                        borderRadius: 15
                    }]}>
                <FontAwesome6 name="play" size={20} color={colors.primary} />
                <Text style={[styles.textIcon, { fontSize: fontSize.sm, fontFamily: fonts.SoraMedium }]}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => shuffleAll(tracks)}
                style={[
                    styles.containerRowCenter,
                    {
                        flex: 1,
                        backgroundColor: colors.backgroundAlt,
                        paddingVertical: spacing.base,
                        borderRadius: 15
                    }]}>
                <Ionicons name="shuffle-sharp" size={24} color={colors.primary} />
                <Text style={[styles.textIcon, { fontSize: fontSize.sm, fontFamily: fonts.SoraMedium }]}>Shuffle</Text>
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