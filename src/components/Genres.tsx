import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { colors } from "@/constants/color";
import { fonts } from "@/constants/fonts";
import { genres } from "@/constants/genre";
import { fontSize, spacing } from "@/constants/sizes";
import { useCallback } from "react";

const Genres = ({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: (val: number) => void;
}) => {
  const handleSelect = useCallback(
    (id: number) => {
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
        backgroundColor:colors.background,
        gap: spacing.sm,
        height: spacing.xl * 2,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: spacing.base,
      }}
    >
      {genres.map((item) => (
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => handleSelect(item.id)}
          style={[
            styles.genreContainer,
            {
              backgroundColor:
                selected === item.id ? colors.primary : colors.backgroundAlt,
            },
          ]}
          key={item.id}
        >
          <Text
            style={[
              styles.genreText,
              {
                color: selected === item.id ? colors.text : colors.textMuted,
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

export default Genres;
