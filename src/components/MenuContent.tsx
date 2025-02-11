import * as DropdownMenu from "zeego/dropdown-menu"
import { Entypo } from '@expo/vector-icons'
import { colors } from "@/constants/color"
import { Track } from "react-native-track-player"
import { useFavorite } from "@/hooks/useFavorite"
import { router } from "expo-router"


const MenuContent = ({ item }: { item: Track }) => {

    const { isFavorite, toggleFavorite } = useFavorite()

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Entypo name="dots-three-horizontal" size={16} color={colors.icon} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Item key='heart' onSelect={() => toggleFavorite(item)}>
                    <DropdownMenu.ItemIcon ios={{
                        name: isFavorite(item) ? "heart.fill" : "heart",
                        hierarchicalColor: isFavorite(item) ? colors.primary : colors.icon
                    }}>

                    </DropdownMenu.ItemIcon>
                    <DropdownMenu.ItemTitle>
                        {isFavorite(item) ? "Remove from Favorites" : "Add to Favorites"}
                    </DropdownMenu.ItemTitle>
                </DropdownMenu.Item>
                <DropdownMenu.Item onSelect={() => router.push({ pathname: "/add-playlist", params: { track: JSON.stringify(item) } })} key='playlist'>
                    <DropdownMenu.ItemIcon ios={{
                        name: "play.square.stack.fill",
                    }}>

                    </DropdownMenu.ItemIcon>
                    <DropdownMenu.ItemTitle>
                        Add Playlist
                    </DropdownMenu.ItemTitle>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

export default MenuContent