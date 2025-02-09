import { useEventLogger } from "@/hooks/useEventLogger";
import { setupPlayer, useInitializePlayer } from "@/hooks/useSetupTrackPlayer";
import { playbackService } from "@/services/playbackService";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { AppRegistry } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TrackPlayer from "react-native-track-player";
import { GestureHandlerRootView } from "react-native-gesture-handler"



TrackPlayer.registerPlaybackService(() => playbackService)
AppRegistry.registerComponent("musim", () => App)

SplashScreen.preventAutoHideAsync()


export const App = () => {

  const initialized = useRef(false)
  const { initializePlayer } = useInitializePlayer()

  const [loaded, error] = useFonts({
    "Sora-Bold": require("../../assets/fonts/Sora-Bold.ttf"),
    "Sora-ExtraBold": require("../../assets/fonts/Sora-ExtraBold.ttf"),
    "Sora-Light": require("../../assets/fonts/Sora-Light.ttf"),
    "Sora-Medium": require("../../assets/fonts/Sora-Medium.ttf"),
    "Sora-SemiBold": require("../../assets/fonts/Sora-SemiBold.ttf"),
    "Sora-Regular": require("../../assets/fonts/Sora-Regular.ttf"),
  })

  const handleLoadSplashScreen = useCallback(() => {
    setupPlayer().then(() => {
      SplashScreen.hideAsync()
      initializePlayer()
      initialized.current = true
    }).catch(e => {
      initialized.current = false
      console.log("Error setting up player", e)
    })
  }, [])


  useEffect(() => {
    if (loaded && !error) {
      handleLoadSplashScreen()
    }
  }, [loaded, error])


  useEventLogger()

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayout />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="player"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default App;