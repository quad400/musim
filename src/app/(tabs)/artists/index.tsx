import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useArtists } from "@/hooks/useArtist";
import { spacing } from "@/constants/sizes";
import HorizontalSeparator from "@/components/HorizontalSeparator";
import { colors } from "@/constants/color";
import ArtistItem from "@/components/artists/ArtistItem";
import { useSearchLayout } from "@/hooks/useSearchLayout";
import ArtistCard from "@/components/artists/ArtistCard";

const Page = () => {
  const { bottom } = useSafeAreaInsets();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useArtists();
  // Flatten the data from all pages into a single array
  const flattenedData = data?.pages.flat() || [];

  // Function to load more data when the user scrolls near the end
  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Render an error message
  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  console.log("flattenedData", flattenedData);
  const numColumns = Math.floor(spacing.width / 120);

  return (
    <FlatList
      data={flattenedData}
      contentInsetAdjustmentBehavior="automatic"
      numColumns={numColumns}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{
        paddingHorizontal: spacing.base,
        flexGrow: 1,
        marginTop: spacing.base,
        paddingBottom: bottom + 100,
        gap: spacing.base,
        backgroundColor: colors.background,
      }}
      ListEmptyComponent={() =>
        isLoading && (
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
      renderItem={({ item }) => <ArtistCard item={item} key={item.id} />}
      onEndReached={loadMore} // Triggered when the user scrolls near the end
      onEndReachedThreshold={0.5} // Load more data when 50% of the list is reached
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
});
export default Page;
