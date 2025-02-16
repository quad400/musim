import { TrackMapper } from "@/interfaces";
import { Track } from "@/interfaces/dreezer";

export const formatSecondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const trackMapper = (track: Track): TrackMapper => {
  return {
    artist: track.artist.name,
    title: track.title,
    url: track.preview,
    artwork: track.album.cover,
    id: track.id,
    artwork_full: track.album.cover_xl,
  };
};
