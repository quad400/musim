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
import HorizontalSeparator from "../HorizontalSeparator";
import { useTopPlaylist } from "@/hooks/useQuery";
import SkeletonLoader from "../SkeletonLoader";
import { fonts } from "@/constants/fonts";
import TopPlaylistCard from "./TopPlaylistCard";
import LargeCardSkeleton from "../LargeCardSkeleton";
import TextButton from "../TextButton";
import { router } from "expo-router";

const TopPlaylist = ({ genreId }: { genreId: number }) => {
  const { data, isFetching, refetch } = useTopPlaylist(genreId);

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
      {data && data?.length > 0 && <HeaderComponent />}
      <FlatList
        data={data}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: spacing.base,
          // flexGrow: 1,
          marginTop: spacing.base,
          gap: spacing.sm,
          backgroundColor: colors.background,
        }}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HorizontalSeparator}
        keyExtractor={(item, index) => index.toString()}
        indicatorStyle="default"
        renderItem={({ item, index }) => (
          <TopPlaylistCard item={item} key={index} />
        )}
      />
    </View>
  );
};

export default TopPlaylist;

const HeaderComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotlist</Text>
      <TextButton onPress={()=>router.push("/(tabs)/(songs)/hot-list")} label="See All" />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.base,
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
