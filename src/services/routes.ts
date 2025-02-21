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

export const GET_ARTISTS = (page: number) => {
  const index = (page - 1) * 15;
  return `chart/0/artists/?limit=15&index=${index}`;
};

export const GET_HOTLIST = (page: number) => {
  const index = (page - 1) * 15;
  return `chart/0/playlists/?limit=15&index=${index}`;
};

export const GET_TRENDING_ALBUM = (page: number) => {
  const index = (page - 1) * 15;
  return `chart/0/albums/?limit=15&index=${index}`;
};

export const GET_HOTLIST_BY_ID = (id: string) => {
  return `playlist/${id}`;
}

export const GET_ARTIST = (id: string) => {
  return `artist/${id}`;
}

export const GET_ALBUM_BY_ARTIST = (id: string) => {
  return `artist/${id}/albums`;
}


export const GET_TRACKS_BY_ARTIST = (id: string,page:number) => {
  const index = (page - 1) * 15;
  return `artist/${id}/top?limit=15&index=${index}`;
}
  
  export const GET_ALBUM = (id: string) => {
    return `album/${id}`;
  }