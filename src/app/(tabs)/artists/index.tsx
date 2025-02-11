import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useArtist from '@/hooks/useArtist'
import { spacing } from '@/constants/sizes'
import HorizontalSeparator from '@/components/HorizontalSeparator'
import { colors } from '@/constants/color'
import ArtistItem from '@/components/ArtistItem'

const Page = () => {
  const { bottom } = useSafeAreaInsets()

  const { artists } = useArtist()

  return (

    <FlatList
      contentInsetAdjustmentBehavior='automatic'
      data={artists}
      contentContainerStyle={{
        paddingHorizontal: spacing.base,
        flexGrow: 1,
        paddingBottom: bottom + 100,
        backgroundColor: colors.background
      }}
      ItemSeparatorComponent={HorizontalSeparator}
      keyExtractor={(item, index) => index.toString()}
      indicatorStyle="default"
      renderItem={({ item, index }) => {
        return (
          <ArtistItem
            item={item} key={index} />
        )
      }}
    />
  )
}


export default Page