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
    artwork: track.album.cover_big,
    id: track.id,
    artwork_full: track.album.cover_big,
  };
};

export function formatNumber(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "b"; // Billions
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "m"; // Millions
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "k"; // Thousands
  } else {
    return num.toString(); // Less than 1000
  }
}

export function debounce<T extends (...args: any[]) => void>(
  func: T, 
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}