import * as DropdownMenu from "zeego/dropdown-menu"
import { Entypo } from '@expo/vector-icons'
import { colors } from "@/constants/color"
import { Track } from "react-native-track-player"
import { useFavorite } from "@/hooks/useFavorite"
import { router } from "expo-router"
import { Playlist } from "@/interfaces"
import { } from 'react-native-ios-utilities';
import { Text } from "react-native"
import { usePlaylist } from "@/hooks/usePlaylist"


const PlaylistMenuContent = ({ item }: { item: Playlist }) => {

    const { deletePlaylist } = usePlaylist()

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Entypo name="dots-three-horizontal" size={16} color={colors.icon} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Item key='heart' >
                    <DropdownMenu.ItemIcon ios={{
                        name: "square.and.pencil",
                        scale: "medium",
                        weight: "black",
                        hierarchicalColor: colors.icon
                    }}>

                    </DropdownMenu.ItemIcon>
                    <DropdownMenu.ItemTitle>
                        Edit
                    </DropdownMenu.ItemTitle>
                </DropdownMenu.Item>
                <DropdownMenu.Item destructive={true} onSelect={() => deletePlaylist(item.id)} key='playlist'>
                    <DropdownMenu.ItemIcon ios={{
                        name: "trash.fill"
                    }}>

                    </DropdownMenu.ItemIcon>
                    <DropdownMenu.ItemTitle style={{ color: colors.primary }} color={colors.primary}>
                        Delete
                    </DropdownMenu.ItemTitle>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

export default PlaylistMenuContent