import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '@/constants/color'
import { fontSize, spacing } from '@/constants/sizes'
import { fonts } from '@/constants/fonts'
import { router } from 'expo-router'
import { usePlaylist } from '@/hooks/usePlaylist'
import PlaylistItem from '@/components/PlaylistItem'
import HorizontalSeparator from '@/components/HorizontalSeparator'

const AddPlaylist = () => {

  const { playlists } = usePlaylist()

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