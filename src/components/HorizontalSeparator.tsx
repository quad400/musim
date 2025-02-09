import { View, Text } from 'react-native'
import React from 'react'
import { colors } from '@/constants/colors'

const HorizontalSeparator = () => {
  return (
    <View style={{
        paddingVertical:3,
    }}>
        <View
            style={{
                height:1,
                backgroundColor:colors.backgroundAlt
            }}
        />
    </View>
  )
}

export default HorizontalSeparator