import { useEventLogger } from "@/hooks/useEventLogger";
import { setupPlayer, useInitializePlayer } from "@/hooks/useSetupTrackPlayer";
import { playbackService } from "@/services/playbackService";
import { useFonts } from "expo-font";
import { router, SplashScreen, Stack } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { AppRegistry, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TrackPlayer from "react-native-track-player";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { fonts } from "@/constants/fonts";
import { colors } from "@/constants/color";
import { AntDesign } from "@expo/vector-icons";
import { Toaster } from "sonner-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useOnlineManager } from "@/hooks/useOnlineManager";

const queryClient = new QueryClient({
  defaultOptions:{}
});

TrackPlayer.registerPlaybackService(() => playbackService);
AppRegistry.registerComponent("musim", () => App);

SplashScreen.preventAutoHideAsync();

export const App = () => {
  const initialized = useRef(false);
  const { initializePlayer } = useInitializePlayer();
  // const online = useOnlineManager()

  // console.log("Online", online)
  useEffect(() => {
    if (initialized.current) return;
    setupPlayer()
      .then(() => {
        initializePlayer();
        initialized.current = true;
        SplashScreen.hideAsync();
      })
      .catch((e) => {
        initialized.current = false;
        console.log("Error setting up player", e);
      });
  }, [initializePlayer, initialized.current]);

  useEventLogger();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootLayout />
          <Toaster
            toastOptions={{
              style: {
                backgroundColor: colors.backgroundAlt,
              },
            }}
            icons={{
              success: (
                <AntDesign name="checkcircle" size={24} color={colors.text} />
              ),
              error: (
                <AntDesign name="closecircle" size={24} color={colors.text} />
              ),
            }}
          />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="player"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-playlist"
        options={{
          presentation: "modal",
          headerTitle: "Add Playlist",
          contentStyle: {
            backgroundColor: colors.background,
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
            fontFamily: fonts.SoraBold,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="close" size={24} color={colors.textMuted} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="new-playlist"
        options={{
          presentation: "modal",
          headerTitle: "New Playlist",
          contentStyle: {
            backgroundColor: colors.background,
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
            fontFamily: fonts.SoraBold,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="close" size={24} color={colors.textMuted} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen name="search" />
    </Stack>
  );
};

export default App;
