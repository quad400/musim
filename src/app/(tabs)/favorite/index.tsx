import { FlatList } from "react-native";
import React from "react";
import { spacing } from "@/constants/sizes";
import { colors } from "@/constants/color";
import HorizontalSeparator from "@/components/HorizontalSeparator";
import TrackItem from "@/components/tracks/TrackItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelectTrack, useSelectTrackMapped } from "@/hooks/usePlayer";
import { useFavorite } from "@/hooks/useFavorite";
import EmptyList from "@/components/EmptyList";
import { useSearchLayout } from "@/hooks/useSearchLayout";
import TrackItemMapped from "@/components/tracks/TrackItemMapped";

const Favorites = () => {
  const { bottom } = useSafeAreaInsets();

  const search = useSearchLayout({
    searchBarOptions: {
      placeholder: "Find in favorite",
    },
  });

  const { favorites } = useFavorite({ search });

  const { handleSelectedTrack } = useSelectTrackMapped(favorites);
  console.log(favorites);
  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={favorites}
      contentContainerStyle={{
        paddingHorizontal: spacing.base,
        flexGrow: 1,
        paddingBottom: bottom + 100,
        backgroundColor: colors.background,
      }}
      ListEmptyComponent={() => (
        <EmptyList title="You have no Favorite Music" />
      )}
      ItemSeparatorComponent={HorizontalSeparator}
      keyExtractor={(item, index) => index.toString()}
      indicatorStyle="default"
      // ListHeaderComponent={() => <HeaderComponentPlayer tracks={favorites} />}
      renderItem={({ item, index }) => (
        <TrackItemMapped
          onPress={() => handleSelectedTrack(item)}
          item={item}
          key={index}
        />
      )}
    />
  );
};

export default Favorites;
