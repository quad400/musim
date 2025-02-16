import {
  View,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TouchableHighlight,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { defaultStyles } from "@/constants/styles";
import { colors } from "@/constants/color";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { fontSize } from "@/constants/sizes";
import FloatingPlayer from "@/components/FloatingPlayer";
import IconButton from "@/components/buttons/IconButton";

const Layout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Artists",
            contentStyle: {
              backgroundColor: colors.background,
            },
            headerTitleStyle: {
              color: colors.text,
              fontSize: fontSize.lg,
              fontWeight: "700",
            },
            headerLargeTitle: true,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerRight: () => (
              <IconButton onPress={() => router.push("/search")}>
                <AntDesign name="search1" size={24} color={colors.icon} />
              </IconButton>
            ),
            headerSearchBarOptions: {
              tintColor: colors.primary,
              hideWhenScrolling: true,
              placeholder: "Find in Artist",
              onChangeText: (
                query: NativeSyntheticEvent<TextInputFocusEventData>
              ) => {
                console.log(query.nativeEvent.text);
              },
            },
          }}
        />

        <Stack.Screen
          name="[id]"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colors.background,
            },
            contentStyle: {
              marginBottom: 100,
              backgroundColor: colors.background,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ height: 40, width: 40, justifyContent: "center" }}
              >
                <Entypo name="chevron-left" size={24} color={colors.icon} />
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
