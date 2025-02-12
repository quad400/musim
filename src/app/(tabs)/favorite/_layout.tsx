import { View, Text, Platform, TouchableOpacity, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
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
            headerTitle: 'Favorites',
            contentStyle: {
                backgroundColor: colors.background
            },
            headerTitleStyle: {
                color: colors.text,
                fontFamily: fonts.SoraBold
            },
            headerLargeTitle: true,
            headerStyle: {
                backgroundColor: colors.background
            },
            headerRight: () => (
                (Platform.OS === "android" && <TouchableOpacity activeOpacity={0.6}>
                    <AntDesign name='search1' size={24} color={colors.icon} />
                </TouchableOpacity>)
            )
        }} />
    </Stack>
    <FloatingPlayer />
</View>
  )
}

export default Layout