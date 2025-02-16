import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { colors } from "@/constants/color";
import { fonts } from "@/constants/fonts";
import { fontSize } from "@/constants/sizes";

interface TextButtonProps extends TouchableOpacityProps {
  label: string;
}

const TextButton: React.FC<TextButtonProps> = ({ style, label,...props }) => {
  return (
    <TouchableOpacity {...props} activeOpacity={0.4} style={[styles.container, style]}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: fonts.SoraMedium,
    fontSize: fontSize.sm,
    color: colors.primary,
  },
});
