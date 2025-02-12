import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/styles'
import { fonts } from '@/constants/fonts'
import { fontSize, spacing } from '@/constants/sizes'
import { colors } from '@/constants/color'
import { router } from 'expo-router'

const EmptyList = ({ title }: { title: string }) => {
    return (
        <View style={{ justifyContent: "center", height: "70%" }}>
            <Text style={[defaultStyles.text, { textAlign: "center", fontFamily: fonts.SoraMedium, fontSize: fontSize.sm }]}>
                {title}
            </Text>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={()=>router.replace("/")} style={styles.btn}>
                    <Text style={{
                        color: colors.text,
                        fontFamily: fonts.SoraMedium,
                        fontSize: fontSize.sm
                    }}>Browse</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EmptyList

const styles = StyleSheet.create({
    btnContainer: {
        marginTop: spacing.xl,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    btn: {
        backgroundColor:colors.primary,
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.sm,
        borderRadius: spacing.base
    }
})