import { useInfiniteQuery } from "@tanstack/react-query";
import { getArtists } from "@/services/deezerServices";


export const useArtists = () => {
  const query = useInfiniteQuery({
    queryKey: ["artists"], // Unique key for the query
    queryFn: getArtists, // Function to fetch data
    getNextPageParam: (lastPage, allPages) => {
      // Return the next page number
      return allPages.length + 1;
    },
    initialPageParam: 1, // Initial page number
  });
  return query;
};
