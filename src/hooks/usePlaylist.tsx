import { Playlist } from "@/interfaces"
import { useMMKVObject } from "react-native-mmkv"
import { Track } from "react-native-track-player"


export const usePlaylist = () => {
    const [playlists, setPlaylist] = useMMKVObject<Playlist[]>("playlist")

    const createPlaylist = (name: string) => {
        const playlistList = playlists || []
        const newPlaylist: Playlist = {
            id: Date.now().toString(),
            name,
            image: null,
            tracks: []
        }
        setPlaylist([...playlistList, newPlaylist])
    }

    const deletePlaylist = (id: string) => {
        const playlistList = playlists || []
        const newPlaylistList = playlistList.filter(playlist => playlist.id !== id)
        setPlaylist(newPlaylistList)
    }

    const addTrackToPlaylist = (playlistId: string, track: Track) => {
        const playlistList = playlists || []
        const newPlaylistList = playlistList.map(playlist => {
            if (playlist.id === playlistId) {
                return {
                    ...playlist,
                    tracks: [...playlist.tracks, track]
                }
            }
            return playlist
        })
        setPlaylist(newPlaylistList)
    }

    const removeTrackFromPlaylist = (playlistId: string, trackId: string) => {
        const playlistList = playlists || []
        const newPlaylistList = playlistList.map(playlist => {
            if (playlist.id === playlistId) {
                return {
                    ...playlist,
                    tracks: playlist.tracks.filter(track => track.id !== trackId)
                }
            }
            return playlist
        })
        setPlaylist(newPlaylistList)
    }

    return {
        playlists,
        createPlaylist,
        deletePlaylist,
        addTrackToPlaylist,
        removeTrackFromPlaylist
    }
}