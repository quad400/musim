import { Dimensions } from "react-native"

export const fontSize = {
    xs: 12,
    sm: 14,
    md: 16,
    base: 20,
    lg: 24
}

const { width, height } = Dimensions.get('window')

export const spacing = {
    xs: 4,
    sm: 8,
    base: 16,
    lg: 24,
    xl: 32,
    width,
    height
}