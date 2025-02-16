import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTopTracks } from "@/hooks/useQuery";
import { useSelectTrack } from "@/hooks/usePlayer";
import { spacing } from "@/constants/sizes";
import { colors } from "@/constants/color";
import HorizontalSeparator from "@/components/HorizontalSeparator";
import TrackItem from "@/components/tracks/TrackItem";
import Genres from "@/components/Genres";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TopTracks = () => {
  const [selectedGenre, setSelectedGenre] = useState(0);
  const { bottom } = useSafeAreaInsets();
  const { data, isFetching, refetch, isRefetching } =
    useTopTracks(selectedGenre);

  const { handleSelectedTrack } = useSelectTrack(data ? data : []);

  useEffect(() => {
    if (selectedGenre) {
      refetch();
    }
  }, [selectedGenre, refetch]);

  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl
          tintColor={colors.primary}
          refreshing={isRefetching}
          onRefresh={refetch}
          colors={[colors.primary]}
        />
      }
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingHorizontal: spacing.base,
        flexGrow: 1,
        paddingBottom: bottom + 100,
        gap: spacing.sm,
        backgroundColor: colors.background,
      }}
      stickyHeaderHiddenOnScroll={true}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={() => (
        <Genres selected={selectedGenre} setSelected={setSelectedGenre} />
      )}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={HorizontalSeparator}
      keyExtractor={(item, index) => index.toString()}
      indicatorStyle="default"
      renderItem={({ item, index }) => (
        <TrackItem onPress={handleSelectedTrack} item={item} key={index} />
      )}
    />
  );
};

export default TopTracks;

const styles = StyleSheet.create({});
