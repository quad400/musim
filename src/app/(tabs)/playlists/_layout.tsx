import { View, Text, Platform, TouchableOpacity, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { defaultStyles } from '@/constants/styles'
import { colors } from '@/constants/color'
import { fontSize } from '@/constants/sizes'
import { AntDesign } from '@expo/vector-icons'
import FloatingPlayer from '@/components/FloatingPlayer'
import { fonts } from '@/constants/fonts'

const Layout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen name='index' options={{
          headerTitle: 'Playlists',
          contentStyle: {
            backgroundColor: colors.background
          },
          headerTitleStyle: {
            color: colors.text,
            fontSize: fontSize.base,
            fontFamily: fonts.SoraBold
          },
          headerStyle: {
            backgroundColor: colors.background
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/add-playlist")} activeOpacity={0.6} style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', }}>
              <AntDesign name='plus' size={24} color={colors.icon} />
            </TouchableOpacity>
          ),
          headerSearchBarOptions: {
            tintColor: colors.primary,
            hideWhenScrolling: true,
            placeholder: 'Find in playlists',
            onChangeText: (query: NativeSyntheticEvent<TextInputFocusEventData>) => {
              console.log(query.nativeEvent.text)
            }
          }
        }} />
        <Stack.Screen name='[id]' />
      </Stack>
      <FloatingPlayer />
    </View>
  )
}

export default Layout