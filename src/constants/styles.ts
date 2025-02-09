import { StyleSheet } from "react-native";
import { colors } from "./color";
import { fontSize } from "./sizes";


export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    text: {
        fontSize: fontSize.sm,
        color: colors.text
    }
})

