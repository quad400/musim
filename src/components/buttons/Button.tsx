import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { fontSize, spacing } from "@/constants/sizes";
import { fonts } from "@/constants/fonts";
import { colors } from "@/constants/color";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label, style, ...props }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={[styles.container, style]}
      {...props}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: spacing.base,
    borderRadius: spacing.base,
    backgroundColor: colors.primary,
    height: spacing.lg * 2.3,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: fonts.SoraMedium,
    fontSize: fontSize.md,
    color: colors.text,
  },
});
