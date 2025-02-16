import { FlatList } from 'react-native'
import React from 'react'
import { colors } from '@/constants/color'
import { spacing } from '@/constants/sizes'
import HorizontalSeparator from '@/components/HorizontalSeparator'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import PlaylistItem from '@/components/playlists/PlaylistItem'
import { usePlaylist } from '@/hooks/usePlaylist'
import { HeaderComponent } from '@/app/add-playlist'
import { router } from 'expo-router'
import { Track } from 'react-native-track-player'
import { Playlist } from '@/interfaces'
import EmptyList from '@/components/EmptyList'

const Playlists = () => {

  const { bottom, top } = useSafeAreaInsets()

  const { playlists } = usePlaylist()

  const handlePress = (item: Playlist) => {
    router.push({ pathname: "/(tabs)/playlists/[id]", params: { id: item.id } })
  }
  return (
    <SafeAreaView style={{ flex: 1, marginTop: top - spacing.base, paddingBottom: bottom }}>

      <FlatList
        data={playlists}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: spacing.base,
          paddingHorizontal: spacing.base,
          gap: spacing.sm
        }}
        ListEmptyComponent={() => (
          <EmptyList title='You have no Playlist' />
        )}
        ItemSeparatorComponent={HorizontalSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <PlaylistItem
              onPress={() => handlePress(item)}
              key={item.id}
              item={item}
            />
          )
        }
        }
      />
    </SafeAreaView>
  )

}

export default Playlists