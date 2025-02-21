import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { useArtistAlbums, useArtistTracks } from "@/hooks/useArtist";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { colors } from "@/constants/color";
import { spacing } from "@/constants/sizes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrackItem from "@/components/tracks/TrackItem";
import { useSelectTrack } from "@/hooks/usePlayer";
import AlbumCard from "@/components/albums/AlbumCard";

const Album = () => {
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data,
    isFetching,
    refetch,
    isRefetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useArtistAlbums(id);

  const tracks = data?.pages.flatMap((page) => page.data) || [];


  const { handleSelectedTrack } = useSelectTrack(tracks);


  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Songs (${data?.pages[0].total})`,
    });
  }, []);

  // Function to load more data when the user scrolls near the end
  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FlatList
      data={tracks}
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
      renderItem={({ item, index }) => (
        <AlbumCard item={item} key={index} />
      )}
      onEndReached={loadMore} // Triggered when the user scrolls near the end
      onEndReachedThreshold={0.5} // Load more data when 50% of the list is reached
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : null
      }
    />
  );
};

export default Album;

const styles = StyleSheet.create({});
