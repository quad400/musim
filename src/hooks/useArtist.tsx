import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getAlbum,
  getAlbumsByArtist,
  getArtist,
  getArtists,
  getTracksByArtist,
  getTrendingAlbum,
} from "@/services/deezerServices";

export const useArtists = () => {
  const query = useInfiniteQuery({
    queryKey: ["artists"], // Unique key for the query
    queryFn: getArtists, // Function to fetch data
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.currentIndex + 10;
      return nextPage < lastPage.total ? nextPage : undefined;
    },
    initialPageParam: 1, // Initial page number
  });
  return query;
};

export const useArtistTracks = (id: string) => {
  const query = useInfiniteQuery({
    queryKey: ["artistTracks", id], 
    queryFn: getTracksByArtist, 
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.currentIndex + 10;
      return nextPage < lastPage.total ? nextPage : undefined;
    },
    initialPageParam: 1,
  })
  return query;
};

export const useArtistAlbums = (id: string) => {
  const query = useInfiniteQuery({
    queryKey: ["artistAlbums", id], 
    queryFn: getAlbumsByArtist, 
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.currentIndex + 10;
      return nextPage < lastPage.total ? nextPage : undefined;
    },
    initialPageParam: 1,
  })
  return query;
};

export const useArtist = (id: string) => {
  const query = useQuery({
    queryKey: ["artist",id], // Unique key for the query
    queryFn: () => getArtist(id), // Function to fetch data
  });
  
  return query;
};

export const useAlbum= (id: string) => {
  const query = useQuery({
    queryKey: ["album", id], // Unique key for the query
    queryFn: () => getAlbum(id), // Function to fetch data
  });
  
  return query;
};



export const useTrendingAlbums = () => {
  const query = useInfiniteQuery({
    queryKey: ["trndingAlbums"], 
    queryFn: getTrendingAlbum, 
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.currentIndex + 10;
      return nextPage < lastPage.total ? nextPage : undefined;
    },
    initialPageParam: 1,
  })
  return query;
};



