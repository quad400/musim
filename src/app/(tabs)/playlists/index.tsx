import { FlatList } from 'react-native'
import React from 'react'
import { colors } from '@/constants/color'
import { spacing } from '@/constants/sizes'
import HorizontalSeparator from '@/components/HorizontalSeparator'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import PlaylistItem from '@/components/PlaylistItem'
import { usePlaylist } from '@/hooks/usePlaylist'
import { HeaderComponent } from '@/app/add-playlist'

const Playlists = () => {

  const { bottom, top } = useSafeAreaInsets()

  const { playlists } = usePlaylist()

  console.log("PLAYLIST:    ", playlists)

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
        ItemSeparatorComponent={HorizontalSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <PlaylistItem
            key={item.id}
            item={item}
          />
        )}
      />
    </SafeAreaView>
  )

}

export default Playlists