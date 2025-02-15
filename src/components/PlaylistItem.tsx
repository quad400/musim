import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Playlist } from '@/interfaces'
import { unknownTrackImageUri } from '@/constants/images'
import { defaultStyles } from '@/constants/styles'
import { fonts } from '@/constants/fonts'
import { StopPropagation } from './StopPropagation'
import PlaylistMenuContent from './PlaylistMenuContent'
import { Link, router } from 'expo-router'

const PlaylistItem = ({ item, onPress }: { item: Playlist, onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={styles.container}>
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