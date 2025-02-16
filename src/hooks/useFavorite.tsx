import { TrackMapper } from "@/interfaces"
import { useCallback, useMemo } from "react"
import { useMMKVObject } from "react-native-mmkv"

export const useFavorite = ({ search }: { search: string }) => {

    const [favorites, setFavorites] = useMMKVObject<TrackMapper[]>("favorites")

    const isFavorite = useCallback((track: TrackMapper) => {
        return favorites?.some((item) => item.url === track.url)
    }, [favorites])

    const toggleFavorite = useCallback((track: TrackMapper) => {
        const currentFavorites = favorites ?? []; // Ensure it's always an array

        if (isFavorite(track)) {
            setFavorites(currentFavorites.filter((item) => item.url !== track.url))
        } else {
            console.log("TRACK: ", track)
            setFavorites([...currentFavorites, track])
        }
    }, [favorites, setFavorites, isFavorite])




    const favoritesData = useMemo(() => {
        if (!search) {
            return favorites
        } else {
            const filteredSongs = favorites?.filter((song: TrackMapper) => song.title?.toLowerCase().includes(search.toLowerCase()))
            return filteredSongs
        }
    }, [favorites, search])


    return {
        isFavorite, toggleFavorite,
        favorites: favoritesData ?? []
    }
}