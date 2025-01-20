import { readData } from "@/core/http-service/http-service"
import { UserListResponse } from "../_types/user-info"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";


type GetUsersOptions = {
    params: {
        page: number;
        results: number;
        slug:string
    };
};



const getUsers = ({
    params,
}: GetUsersOptions): Promise<UserListResponse> => {
    const { page,results } = params;
    const url = `?page=${page}&results=${results}`; // get 3 user in each page
    return readData(url);
};

export const useFetchUserInfo = ({ params }: GetUsersOptions) => {
    const { data, error, isFetchingNextPage, isFetching, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
        queryKey: ['userInfo', params.slug],
        queryFn: ({ pageParam }) => getUsers({ params: { ...params, page: pageParam } }),
           
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.info.page + 1;
            console.log('nextPage:', nextPage); // لاگ مقدار nextPage
            return nextPage <= 20 ? nextPage : undefined; // محدود کردن به 20 صفحه
        },
        
        
        initialPageParam: 1,
        staleTime: 5 * 60 * 60 * 1000,
        gcTime: 6 * 60 * 60 * 1000,
    });

    return { data, error, isFetchingNextPage, isFetching, fetchNextPage, hasNextPage, refetch };
};



