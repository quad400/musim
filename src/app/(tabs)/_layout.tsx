import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { BlurView } from 'expo-blur'
import { FontAwesome, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/color';
import { fontSize } from '@/constants/sizes';

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarLabelStyle: { fontSize: fontSize.xs, fontWeight: "500" },
            tabBarStyle: { 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                backgroundColor: 'transparent', 
                elevation: 0, 
                height: Platform.OS==="ios"? null: 65,
                borderTopWidth: 0 
            },
            tabBarBackground: () => (
                <BlurView tint="dark" experimentalBlurMethod="dimezisBlurView" intensity={100} style={{ 
                    ...StyleSheet.absoluteFillObject, 
                    overflow: "hidden", 
                    borderTopLeftRadius:20,
                    borderTopRightRadius:20,
                    borderTopWidth: 0,
                }} />
            ),
        }}>
            <Tabs.Screen name='(songs)' options={{
                tabBarIcon: ({ focused }) => (
                    <FontAwesome name="music" size={20} color={focused ? colors.primary : colors.textMuted} />
                ),
                tabBarLabel: ({ focused }) => (
                    <Text style={{ color: focused ? colors.primary : colors.textMuted, fontWeight: "500" }}>Songs</Text>
                )
            }} />
            <Tabs.Screen name='favorite' options={{
                tabBarIcon: ({ focused }) => (
                    <MaterialIcons name="favorite" size={20} color={focused ? colors.primary : colors.textMuted} />
                ),
                tabBarLabel: ({ focused }) => (
                    <Text style={{ color: focused ? colors.primary : colors.textMuted, fontWeight: "500" }}>Favorite</Text>
                )
            }} />
            <Tabs.Screen name='playlists' options={{
                tabBarIcon: ({ focused }) => (
                    <Fontisto name="play-list" size={20} color={focused ? colors.primary : colors.textMuted} />
                ),
                tabBarLabel: ({ focused }) => (
                    <Text style={{ color: focused ? colors.primary : colors.textMuted, fontWeight: "500" }}>Playlists</Text>
                )
            }} />
            <Tabs.Screen name='artists' options={{
                tabBarIcon: ({ focused }) => (
                    <FontAwesome name="users" size={20} color={focused ? colors.primary : colors.textMuted} />
                ),
                tabBarLabel: ({ focused }) => (
                    <Text style={{ color: focused ? colors.primary : colors.textMuted, fontWeight: "500" }}>Artist</Text>
                )
            }} />
        </Tabs>
    )
}

export default TabsLayout