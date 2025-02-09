import { View, Text, StyleSheet, TouchableOpacity, Platform, ImageBackground } from 'react-native'
import React from 'react'
import { fontSize, spacing } from '@/constants/sizes'
import { colors } from '@/constants/colors'
import { unknownTrackImageUri } from '@/constants/images'
import * as DropdownMenu from "zeego/dropdown-menu"
import { Entypo } from '@expo/vector-icons'
import { Track, useActiveTrack } from 'react-native-track-player'
import { fonts } from '@/constants/fonts'
import LoaderKit from 'react-native-loader-kit'


const Page = ({ item, onPress }: { item: Track, onPress: () => void }) => {


  const activeTrack = useActiveTrack()


  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={styles.container}>
      <View style={styles.wrapper}>
        <ImageBackground
          source={{ uri: item.artwork ?? unknownTrackImageUri }}
          style={[styles.image, { justifyContent: "center", alignItems: "center" }]}
        >

          {activeTrack?.url === item.url && <LoaderKit
            style={{ width: 30, height: 30, zIndex: 10 }}
            name={'LineScalePulseOut'}
            color={colors.text}
          />}
          {activeTrack?.url === item.url && <View style={{
            width: 50,
            height: 50,
            borderRadius: spacing.sm,
            position: "absolute",
            backgroundColor: "#00000050",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

          }} />
          }</ImageBackground>
        <View style={{ gap: 5 }}>

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.artist}</Text>
        </View>
      </View>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Text>Hello</Text>
          <Entypo name="dots-three-horizontal" size={16} color={colors.icon} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item key='copy'>
            <DropdownMenu.ItemIcon ios={{
              name: "heart.fill",
              hierarchicalColor: colors.primary
            }}>

            </DropdownMenu.ItemIcon>
            <DropdownMenu.ItemTitle>
              Add Favorite
            </DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
          <DropdownMenu.Item key='playlist'>
            <DropdownMenu.ItemIcon ios={{
              name: "play.square.stack.fill",
            }}>

            </DropdownMenu.ItemIcon>
            <DropdownMenu.ItemTitle>
              Remove Playlist
            </DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </TouchableOpacity>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrapper: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    resizeMode: "cover",
  },
  title: {
    fontSize: fontSize.md,
    fontFamily: fonts.SoraSemiBold,
    color: colors.text
  },
  text: {
    fontSize: fontSize.sm,
    fontFamily: fonts.SoraRegular,
    color: colors.textMuted
  }
})