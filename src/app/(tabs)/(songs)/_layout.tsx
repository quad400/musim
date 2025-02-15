import {
  View,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { defaultStyles } from "@/constants/styles";
import { colors } from "@/constants/color";
import { AntDesign } from "@expo/vector-icons";
import { fontSize } from "@/constants/sizes";
import FloatingPlayer from "@/components/FloatingPlayer";
import { fonts } from "@/constants/fonts";

const Layout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "",
            headerLeft: () => {
              return (
                <View>
                  <Text
                    style={{
                      fontFamily: fonts.SoraBold,
                      fontSize:fontSize.lg,
                      color:colors.text
                    }}
                  >
                    Browse
                  </Text>
                </View>
              );
            },
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleAlign: "left",
            contentStyle: {
              backgroundColor: colors.background,
            },
            headerRight: () => (
              <TouchableOpacity activeOpacity={0.6}>
                <AntDesign name="search1" size={24} color={colors.icon} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
      <FloatingPlayer />
    </View>
  );
};

export default Layout;
