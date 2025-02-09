import { View, Text, NativeSyntheticEvent, TextInputFocusEventData, TouchableHighlight, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { defaultStyles } from '@/constants/styles'
import { colors } from '@/constants/colors'
import { AntDesign } from '@expo/vector-icons'
import { fontSize } from '@/constants/sizes'
import FloatingPlayer from '@/components/FloatingPlayer'

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
                    ),

                    // headerBlurEffect: "prominent",
                    // headerTransparent: true,
                    headerSearchBarOptions: {
                        tintColor: colors.primary,
                        hideWhenScrolling: true,
                        placeholder: 'Find in Songs',
                        onChangeText: (query: NativeSyntheticEvent<TextInputFocusEventData>) => {
                            console.log(query.nativeEvent.text)
                        }
                    }
                }} />
            </Stack>
            <FloatingPlayer />
        </View>
    )
}

export default Layout