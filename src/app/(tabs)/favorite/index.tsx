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
import { useFavorite } from '@/hooks/useFavorite'
import EmptyList from '@/components/EmptyList'
import { HeaderComponentPlayer } from '../(songs)'
import { useSearchLayout } from '@/hooks/useSearchLayout'

const Favorites = () => {

  const { bottom } = useSafeAreaInsets()

    const search = useSearchLayout({
        searchBarOptions: {
            placeholder: "Find in favorite"
        }
    })
    

  const { favorites } = useFavorite({search})

  const { handleSelectedTrack } = useSelectTrack(favorites)


  return (

    <FlatList
      contentInsetAdjustmentBehavior='automatic'
      data={favorites}
      contentContainerStyle={{
        paddingHorizontal: spacing.base,
        flexGrow: 1,
        paddingBottom: bottom + 100,
        backgroundColor: colors.background
      }}

      ListEmptyComponent={() => (
        <EmptyList title='You have no Favorite Music' />
      )}
      ItemSeparatorComponent={HorizontalSeparator}
      keyExtractor={(item, index) => index.toString()}
      indicatorStyle="default"
      ListHeaderComponent={() => (<HeaderComponentPlayer
        tracks={favorites}
      />)}
      renderItem={({ item, index }) => (
        <TrackItem
          onPress={() => handleSelectedTrack(item)}
          item={item} key={index} />
      )}
    />
  )
}

export default Favorites
