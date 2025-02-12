import { useEffect, useMemo } from "react"
import { useAppStore } from "./store"
import { Track } from "react-native-track-player"

export const useSongs = ({ tracks, search }: { tracks: Track[], search: string }) => {

    const { setSongs, songs } = useAppStore()
    useEffect(() => {
        setSongs(tracks)
    }, [tracks])

    const musics = useMemo(() => {
        if (!search) {
            return songs
        } else {
            const filteredSongs = songs.filter((song: Track) => song.title?.toLowerCase().includes(search.toLowerCase()))
            return filteredSongs
        }
    }, [songs, search])

    return musics
}
