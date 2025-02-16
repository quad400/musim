import { LoopMode, TrackMapper } from "@/interfaces";
import { Track } from "@/interfaces/dreezer";
import { trackMapper } from "@/utils";
import { useEffect, useState } from "react";
import { useMMKVObject } from "react-native-mmkv";
import TrackPlayer, {
  RepeatMode,
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";

export const usePlayer = () => {
  const [player, setPlayer] = useMMKVObject<TrackMapper>("player");
  const { playing } = useIsPlaying();
  const activeTrack = useActiveTrack();
  // console.log(progress)
  useEffect(() => {
    if (activeTrack) {
      setPlayer(activeTrack as TrackMapper);
    }
  }, [activeTrack, setPlayer]);

  const handlePlayPause = () => {
    if (playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  };

  const skipToNext = () => {
    TrackPlayer.skipToNext();
    setPlayer(activeTrack as TrackMapper);
  };

  const skipToPrevious = () => {
    TrackPlayer.skipToPrevious();
    setPlayer(activeTrack as TrackMapper);
  };

  return {
    handlePlayPause,
    skipToNext,
    skipToPrevious,
    player,
    playing,
  };
};

export const useLoopMode = () => {
  const [loop, setLoop] = useState<LoopMode>(LoopMode.NONE);

  const setLoopMode = async (mode: LoopMode) => {
    if (mode === LoopMode.NONE) {
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
      setLoop(mode);
      return;
    } else if (mode === LoopMode.SINGLE) {
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
      setLoop(mode);
      return;
    } else {
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setLoop(mode);
      return;
    }
  };
  return {
    loop,
    setLoopMode,
  };
};

export const useSelectTrack = (tracks: Track[]) => {
  const [_, setPlayer] = useMMKVObject<TrackMapper>("player");

  const handleSelectedTrack = async (item: Track) => {
    const transformedTrack = trackMapper(item);
    const transformedTracks = tracks.flatMap((track) => trackMapper(track));

    const trackIndex = transformedTracks.findIndex(
      (track) => track.url === transformedTrack.url
    );

    if (trackIndex === -1) return;

    const beforeTracks = transformedTracks.slice(0, trackIndex);
    const afterTracks = transformedTracks.slice(trackIndex + 1);
    setPlayer(transformedTrack);

    await TrackPlayer.reset();

    await TrackPlayer.add(transformedTrack);
    await TrackPlayer.add(afterTracks);
    await TrackPlayer.add(beforeTracks);

    await TrackPlayer.play();
  };

  return {
    handleSelectedTrack,
  };
};

export const useSelectTrackMapped = (tracks: TrackMapper[]) => {
  const [_, setPlayer] = useMMKVObject<TrackMapper>("player");

  const handleSelectedTrack = async (item: TrackMapper) => {
    const trackIndex = tracks.findIndex((track) => track.url === item.url);

    if (trackIndex === -1) return;

    const beforeTracks = tracks.slice(0, trackIndex);
    const afterTracks = tracks.slice(trackIndex + 1);
    setPlayer(item);

    await TrackPlayer.reset();

    await TrackPlayer.add(item);
    await TrackPlayer.add(afterTracks);
    await TrackPlayer.add(beforeTracks);

    await TrackPlayer.play();
  };

  return {
    handleSelectedTrack,
  };
};
