import { View, NativeSyntheticEvent, TextInputFocusEventData, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { defaultStyles } from '@/constants/styles'
import { colors } from '@/constants/color'
import { AntDesign } from '@expo/vector-icons'
import { fontSize } from '@/constants/sizes'
import FloatingPlayer from '@/components/FloatingPlayer'
import { useAppStore } from '@/hooks/store'
import { Track } from 'react-native-track-player'

const Layout = () => {

    
    return (
        <View style={defaultStyles.container}>
            <Stack>
                <Stack.Screen name='index' options={{
                    headerTitle: 'Songs',
                    contentStyle: {
                        backgroundColor: colors.background
                    },
                    headerTitleStyle: {
                        color: colors.text,
                        fontSize: fontSize.lg,
                        fontWeight: '700'
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