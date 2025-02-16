import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fontSize, spacing } from '@/constants/sizes'
import { colors } from '@/constants/color'
import { Playlist } from '@/interfaces'
import { unknownArtistImageUri, unknownTrackImageUri } from '@/constants/images'
import { useLocalSearchParams } from 'expo-router'
import { usePlaylist } from '@/hooks/usePlaylist'
import { fonts } from '@/constants/fonts'
import TrackItem from '@/components/tracks/TrackItem'
import { useSelectTrack, useSelectTrackMapped } from '@/hooks/usePlayer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TrackItemMapped from '@/components/tracks/TrackItemMapped'
import PlayShuffle from '@/components/PlayShuffle'
import PlaylistTrackItem from '@/components/playlists/PlaylistTrackItem'

const PlaylistDetail = () => {

    const {bottom} = useSafeAreaInsets()
    const { id } = useLocalSearchParams<{ id: string }>()

    const { getPlaylistById } = usePlaylist()


    const playlist = getPlaylistById(id)
    const { handleSelectedTrack } = useSelectTrackMapped(playlist?.tracks || [])


    return (
        <FlatList
            data={playlist?.tracks || []}
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom:bottom + 20,
                backgroundColor: colors.background,
                paddingHorizontal: spacing.base,
                gap: spacing.sm
            }}
            ListHeaderComponent={() => <HeaderComponent
                item={playlist!}
            />}
            renderItem={({ item, index }) => (
                <PlaylistTrackItem
                    onPress={() => handleSelectedTrack(item)}
                    item={item} key={index} />
            )}
        />
    )
}

export default PlaylistDetail

const HeaderComponent = ({ item }: { item: Playlist }) => {

    return (
        <View style={styles.container}>
            <Image source={{ uri: item?.image ? item.image : unknownArtistImageUri }} style={styles.image} />
            <Text style={styles.title}>{item?.name}</Text>
            <PlayShuffle
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
