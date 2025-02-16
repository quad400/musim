import * as Network from "expo-network";
import { onlineManager } from "@tanstack/react-query";

export function useOnlineManager() {
  onlineManager.setEventListener((setOnline) => {
    const eventSubscription = Network.addNetworkStateListener((state) => {
      setOnline(!!state.isConnected);
    });
    return eventSubscription.remove;
  });
}
