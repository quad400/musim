import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/styles'
import { fonts } from '@/constants/fonts'
import { fontSize } from '@/constants/sizes'

const EmptyList = ({ title }: { title: string }) => {
    return (
        <View style={{ justifyContent: "center", height: "70%" }}>
            <Text style={[defaultStyles.text, { textAlign: "center", fontFamily: fonts.SoraMedium, fontSize: fontSize.base }]}>
                {title}
            </Text>
        </View>
    )
}

export default EmptyList

const styles = StyleSheet.create({})