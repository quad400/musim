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

const Favorites = () => {

  const { bottom } = useSafeAreaInsets()

  const { favorites } = useFavorite()

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
      ListHeaderComponent={() => (<HeaderComponent
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
        <Text style={[styles.textIcon, { fontSize: fontSize.sm, fontFamily: fonts.SoraMedium }]}>Play</Text>
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