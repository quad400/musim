import { SearchType } from "@/interfaces/dreezer";
import { search } from "@/services/deezerServices";
import { useQuery } from "@tanstack/react-query";

export const useSearch =(queryKey:string,type:SearchType)=>{
    const query = useQuery({
        queryKey: ['search',queryKey, type],
        queryFn: ()=>search(queryKey,type),
        enabled: queryKey !== "",
    });
    return query;
}