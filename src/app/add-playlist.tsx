import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '@/constants/color'
import { fontSize, spacing } from '@/constants/sizes'
import { fonts } from '@/constants/fonts'
import { router, useLocalSearchParams } from 'expo-router'
import { usePlaylist } from '@/hooks/usePlaylist'
import PlaylistItem from '@/components/PlaylistItem'
import HorizontalSeparator from '@/components/HorizontalSeparator'
import { Playlist } from '@/interfaces'
import { Track } from 'react-native-track-player'
import { toast } from 'sonner-native'

const AddPlaylist = () => {

  const { playlists, addTrackToPlaylist } = usePlaylist()

  const { track } = useLocalSearchParams<{ track: string }>()

  const trackParsed: Track = track ? JSON.parse(track) : null

  const handlePress = (item: Playlist) => {
    addTrackToPlaylist(item.id, trackParsed)
    toast.success("Track added successfully")
    router.back()
  }

  return (
    <FlatList
      data={playlists}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.base,
        gap: spacing.sm
      }}
      ItemSeparatorComponent={HorizontalSeparator}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={HeaderComponent}
      renderItem={({ item }) => (
        <PlaylistItem
          onPress={() => handlePress(item)}
          key={item.id}
          item={item}
        />
      )}
    />
  )
}

export default AddPlaylist


export const HeaderComponent = () => {
  return (
    <TouchableOpacity onPress={() => router.push("/new-playlist")} style={styles.container}>
      <View style={styles.iconContainer}>
        <AntDesign name="plus" size={24} color={colors.icon} />
      </View>
      <Text style={{ fontFamily: fonts.SoraMedium, fontSize: fontSize.sm, color: colors.text }}>New Playlist</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: spacing.base
  },
  iconContainer: {
    backgroundColor: colors.backgroundAlt,
    padding: spacing.base,
    borderRadius: spacing.sm
  }
})