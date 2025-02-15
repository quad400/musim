export const TOP_ARTISTS = (genreId: number) => {
  return `chart/${genreId}/artists`;
};

export const TOP_ALBUMS = (genreId: number) => {
  return `chart/${genreId}/albums`;
};

export const TOP_TRACKS = (genreId: number) => {
  return `chart/${genreId}/tracks`;
};

export const TOP_PLAYLIST = (genreId: number) => {
  return `chart/${genreId}/playlists`;
};
