import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fontSize, spacing } from '@/constants/sizes'
import { colors } from '@/constants/color'
import { Artists, Playlist } from '@/interfaces'
import { unknownTrackImageUri } from '@/constants/images'
import { useLocalSearchParams } from 'expo-router'
import { usePlaylist } from '@/hooks/usePlaylist'
import { fonts } from '@/constants/fonts'
import { HeaderComponentPlayer } from '../(songs)'
import TrackItem from '@/components/TrackItem'
import { useSelectTrack } from '@/hooks/usePlayer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useArtist from '@/hooks/useArtist'

const ArtistDetail = () => {

    const { bottom } = useSafeAreaInsets()
    const { id, tracks } = useLocalSearchParams<{ id: string, tracks: string }>()

    const tracksData = JSON.parse(tracks) as Artists

    const { handleSelectedTrack } = useSelectTrack(tracksData.tracks || [])


    return (
        <FlatList
            data={tracksData.tracks || []}
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: bottom + 20,
                backgroundColor: colors.background,
                paddingHorizontal: spacing.base,
                gap: spacing.sm
            }}
            ListHeaderComponent={() => <HeaderComponent
                item={tracksData}
            />}
            renderItem={({ item, index }) => (
                <TrackItem
                    onPress={() => handleSelectedTrack(item)}
                    item={item} key={index} />
            )}
        />
    )
}

export default ArtistDetail

const HeaderComponent = ({ item }: { item: Artists }) => {

    return (
        <View style={styles.container}>

            <Image source={{ uri: unknownTrackImageUri }} style={styles.image} />
            <Text style={styles.title}>{item?.artist}</Text>
            <HeaderComponentPlayer
                tracks={item?.tracks || []}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: "100%",
        height: 350,
        borderRadius: spacing.base,
        resizeMode: "cover"
    },
    title: {
        fontSize: fontSize.lg,
        color: colors.text,
        fontFamily: fonts.SoraSemiBold,
        marginVertical: spacing.base
    }
})
