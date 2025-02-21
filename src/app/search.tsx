import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { SearchType } from "@/interfaces/dreezer";
import { colors } from "@/constants/color";
import { fonts } from "@/constants/fonts";
import { genres } from "@/constants/genre";
import { fontSize, spacing } from "@/constants/sizes";
import { useCallback } from "react";
import { useSearch } from "@/hooks/useSearch";



type Tab = {
  id: number;
  name: string;
  slug: SearchType;
}

const tabs:Tab[] = [
  {
    id: 1,
    name: "Track",
    slug: "track",
  },
  {
    id: 2,
    name: "Artist",
    slug: "artist",
  },
  {
    id: 3,
    name: "Album",
    slug: "album",
  },
  {
    id: 4,
    name: "Playlist",
    slug: "playlist",
  },
]
const Search = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState<SearchType>("track")

  function onSearchButtonPress(
    e: NativeSyntheticEvent<TextInputFocusEventData>
  ): void {
    setSearch(e.nativeEvent.text)
  }

  const {data, isFetching} = useSearch(search, tab)

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        color: colors.text,
        fontFamily: fonts.SoraBold,
        fontSize: fontSize.lg,
      },
      headerSearchBarOptions: {
        tintColor: colors.primary,
        hideWhenScrolling: false,
        placeholder: "Search for songs, artists, albums",
        autoFocus: true,
        onSearchButtonPress: onSearchButtonPress,
      },
    });
  }, [navigation]);
  console.log(data)

  return (
    <FlatList
      data={data}
      contentContainerStyle={{ paddingHorizontal: spacing.base,marginTop:120 }}
      ListHeaderComponent={<HeaderComponent
        selected={tab}
        setSelected={setTab}
      />}
      keyExtractor={(item) => item}
      renderItem={({ item }) => <Text>{item}</Text>}
    />
  );
};

export default Search;



const HeaderComponent = ({
  selected,
  setSelected,
}: {
  selected: SearchType;
  setSelected: (val: SearchType) => void;
}) => {
  const handleSelect = useCallback(
    (id: SearchType) => {
      setSelected(id);
    },
    [setSelected]
  );

  return (
    <ScrollView
      horizontal={true}
      scrollEventThrottle={16} // Optimize scroll tracking
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        marginTop: spacing.xl,
        backgroundColor:colors.background,
        gap: spacing.sm,
        height: spacing.xl * 2,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: spacing.base,
      }}
    >
      {tabs.map((item) => (
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => handleSelect(item.slug)}
          style={[
            styles.genreContainer,
            {
              backgroundColor:
                selected === item.slug ? colors.primary : colors.backgroundAlt,
            },
          ]}
          key={item.id}
        >
          <Text
            style={[
              styles.genreText,
              {
                color: selected === item.slug ? colors.text : colors.textMuted,
              },
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  containerRowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textIcon: {
    color: colors.primary,
    marginLeft: spacing.sm,
  },
  genreContainer: {
    borderRadius: spacing.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  genreText: {
    fontFamily: fonts.SoraMedium,
    fontSize: fontSize.sm,
  },
});
