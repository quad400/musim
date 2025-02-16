import * as DropdownMenu from "zeego/dropdown-menu";
import { Entypo } from "@expo/vector-icons";
import { colors } from "@/constants/color";
import { useFavorite } from "@/hooks/useFavorite";
import { router, useLocalSearchParams } from "expo-router";
import { TrackMapper } from "@/interfaces";
import { usePlaylist } from "@/hooks/usePlaylist";

const MenuContentPlaylistTrackItem = ({ item }: { item: TrackMapper }) => {
  const { isFavorite, toggleFavorite } = useFavorite({ search: "" });
  const { removeTrackFromPlaylist } = usePlaylist();

  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Entypo name="dots-three-horizontal" size={16} color={colors.icon} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item key="heart" onSelect={() => toggleFavorite(item)}>
          <DropdownMenu.ItemIcon
            ios={{
              name: isFavorite(item) ? "heart.fill" : "heart",
              hierarchicalColor: isFavorite(item)
                ? colors.primary
                : colors.icon,
            }}
          ></DropdownMenu.ItemIcon>
          <DropdownMenu.ItemTitle>
            {isFavorite(item) ? "Remove from Favorites" : "Add to Favorites"}
          </DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onSelect={() => removeTrackFromPlaylist(id, item.id)}
          key="playlist"
        >
          <DropdownMenu.ItemIcon
            ios={{
              name: "play.square.stack.fill",
            }}
          ></DropdownMenu.ItemIcon>
          <DropdownMenu.ItemTitle>Remove Playlist</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default MenuContentPlaylistTrackItem;
