import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { tracks } from '@/constants/data'
import { Track } from 'react-native-track-player'
import { Artists } from '@/interfaces'

const useArtist = ({ search }: { search: string }) => {

    const [artists, setArtists] = useState<Artists[]>()


    const getArtist = useCallback(() => {
        const grouped: Record<string, Track[]> = {};

        tracks.forEach(track => {
            const artist = track.artist || "Unknown";
            if (!grouped[artist]) {
                grouped[artist] = [];
            }

            const { artist: _, ...trackWithoutArtist } = track;
            grouped[artist].push(trackWithoutArtist);
        });

        const newArtist = Object.keys(grouped).map(artist => ({
            id: Date.now().toString(),
            artist,
            tracks: grouped[artist]
        })) as Artists[];

        setArtists(newArtist)
    }, [tracks, setArtists])


    useEffect(() => {
        if (artists) return;
        getArtist()
    }, [getArtist])


    const artistList = useMemo(() => {
        if (!search) {
            return artists
        } else {
            const filteredArtist = artists?.filter((artist: Artists) => artist.artist?.toLowerCase().includes(search.toLowerCase()))
            return filteredArtist
        }
    }, [artists, search])

    return { artists: artistList }
}

export default useArtist