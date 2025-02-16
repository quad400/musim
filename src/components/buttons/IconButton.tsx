import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { colors } from "@/constants/color";

interface IconButtonProps extends TouchableOpacityProps {
    children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <TouchableOpacity {...props} activeOpacity={0.4} style={styles.container}>
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
