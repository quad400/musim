import { useCallback } from "react"
import { useMMKVObject } from "react-native-mmkv"
import { Track } from "react-native-track-player"

export const useFavorite = () => {

    const [favorites, setFavorites] = useMMKVObject<Track[]>("favorites")

    const isFavorite = useCallback((track: Track) => {
        return favorites?.some((item) => item.url === track.url)
    }, [favorites])

    const toggleFavorite = useCallback((track: Track) => {
        const currentFavorites = favorites ?? []; // Ensure it's always an array

        if (isFavorite(track)) {
            setFavorites(currentFavorites.filter((item) => item.url !== track.url))
        } else {
            console.log("TRACK: ", track)
            setFavorites([...currentFavorites, track])
        }
    }, [favorites, setFavorites, isFavorite])


    return {
        isFavorite, toggleFavorite,
        favorites: favorites ?? []
    }
}