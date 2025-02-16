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
import { useTopArtists } from "@/hooks/useQuery";
import SkeletonLoader from "../SkeletonLoader";
import { fonts } from "@/constants/fonts";
import TopArtistCard from "./TopArtistCard";
import TextButton from "../TextButton";
import { router } from "expo-router";

const TopArtists = ({ genreId }: { genreId: number }) => {
  const { data, isFetching, refetch } = useTopArtists(genreId);
  
  
  useEffect(() => {
    if(genreId){
      refetch();
    }
  }, [genreId, refetch]);
  
  
  if (!data && isFetching) {
    return <SkeletonLoader width={100} height={100} />;
  }

  return (
    <View>
      <HeaderComponent />
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
          <TopArtistCard item={item} key={index} />
        )}
      />
    </View>
  );
};

export default TopArtists;

const HeaderComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Artists</Text>
      <TextButton onPress={()=>router.push("/(tabs)/(songs)/top-artist")} label="See All" />
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
