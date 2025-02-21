import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import React from "react";
import { spacing } from "@/constants/sizes";
import { colors } from "@/constants/color";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHotList } from "@/hooks/usePlaylist";
import HotlistItem from "@/components/playlists/HotlistItem";

const HotList = () => {
  const { bottom } = useSafeAreaInsets();
  const { data, isFetching, refetch, isRefetching } = useHotList();

  const flattenedData = data?.pages.flat() || [];


  return (
    <FlatList
      data={flattenedData}
      refreshControl={
        <RefreshControl
          tintColor={colors.primary}
          refreshing={isRefetching}
          onRefresh={refetch}
          colors={[colors.primary]}
        />
      }
      ListEmptyComponent={() =>
        isFetching && (
          <View
            style={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )
      }
      contentInsetAdjustmentBehavior="automatic"
      // numColumns={numColumns}
      contentContainerStyle={{
        paddingHorizontal: spacing.base,
        flexGrow: 1,
        marginTop: spacing.base,
        paddingBottom: bottom + 100,
        gap: spacing.base,
        backgroundColor: colors.background,
      }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      indicatorStyle="default"
      renderItem={({ item, index }) => <HotlistItem item={item} key={index} />}
    />
  );
};

export default HotList;