import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Playlist } from '@/interfaces'
import { unknownTrackImageUri } from '@/constants/images'
import { defaultStyles } from '@/constants/styles'
import { fonts } from '@/constants/fonts'
import { StopPropagation } from './StopPropagation'
import PlaylistMenuContent from './PlaylistMenuContent'
import { Link } from 'expo-router'

const PlaylistItem = ({ item }: { item: Playlist }) => {
  console.log(item)
  return (
    <Link href="/(tabs)/playlists/[id]" push asChild>
      <TouchableOpacity activeOpacity={0.5} style={styles.container}>
        {item?.image ? <Image source={{ uri: item.image }} style={styles.image} /> :
          <Image source={{ uri: unknownTrackImageUri }} style={styles.image} />}
        <View style={styles.content}>
          <Text style={[defaultStyles.text, { fontFamily: fonts.SoraMedium }]}>{item?.name}</Text>
        </View>
        <StopPropagation>
          <PlaylistMenuContent
            item={item}
          />
        </StopPropagation>
      </TouchableOpacity>
    </Link>
  )
}

export default PlaylistItem

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  }
})