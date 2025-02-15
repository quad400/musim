import { colors } from "@/constants/color";
import { fontSize, spacing } from "@/constants/sizes";
import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HorizontalSeparator from "./HorizontalSeparator";
import { useTopTracks } from "@/hooks/useQuery";
import TopTrackCard from "./TopTrackCard";
import SkeletonLoader from "./SkeletonLoader";
import { fonts } from "@/constants/fonts";
import LargeCardSkeleton from "./LargeCardSkeleton";

const TopTracks = ({ genreId }: { genreId: number }) => {
  const { data, isFetching, refetch } = useTopTracks(genreId);

  useEffect(() => {
    if (genreId) {
      refetch();
    }
  }, [genreId, refetch]);

  if (!data && isFetching) {
    return <LargeCardSkeleton />;
  }

  return (
    <View>
      <HeaderComponent />
      <FlatList
        data={data}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: spacing.base,
          flexGrow: 1,
          marginTop: spacing.base,
          gap: spacing.sm,
          backgroundColor: colors.background,
        }}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HorizontalSeparator}
        keyExtractor={(item, index) => index.toString()}
        indicatorStyle="default"
        renderItem={({ item, index }) => (
          <TopTrackCard item={item} key={index} />
        )}
      />
    </View>
  );
};

export default TopTracks;

const HeaderComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending Now</Text>
      <TouchableOpacity activeOpacity={0.4}>
        <Text style={styles.seeAll}>See All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.sm,
    marginHorizontal: spacing.base,
  },
  title: {
    fontFamily: fonts.SoraBold,
    fontSize: fontSize.base,
    color: colors.text,
  },
  seeAll: {
    fontFamily: fonts.SoraMedium,
    fontSize: fontSize.sm,
    color: colors.primary,
  },
});
