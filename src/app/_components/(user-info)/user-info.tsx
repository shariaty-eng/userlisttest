'use client'
import { useInView } from "react-intersection-observer"
import { useFetchUserInfo } from "./_api/get-user-info"
import { useEffect } from "react"
import { CardPlaceholder } from "../placeholders"
import { Avatar } from "../avatar"
import './user-info.scss'

const UserInfo = () => {
    const { ref, inView } = useInView({})
    const { data: userInfo, error, isFetchingNextPage, isFetching, fetchNextPage, hasNextPage, refetch } = useFetchUserInfo({
        params: {
            page: 1,
            results: 3,
            slug: 'infinit scroll'
        }
    })

    useEffect(() => {
        console.log('isFetchingNextPage...', isFetchingNextPage);
        if (inView && hasNextPage && !isFetchingNextPage) {
            console.log('Fetching next page...');
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);



    return (
        <>
            <div className='user-box'>
                {userInfo?.pages?.map((page) =>
                    page.results.map((user, index) => (
                        <div className="user-details" key={`user-info-${index}`}>
                           <Avatar
                                src={user.picture.thumbnail}
                                size="tiny"
                            /> 
                            <p className="user-nam">{user.name.first + ' ' + user.name.last}</p>
                        </div>
                    ))
                )}
            </div>
            {(isFetching || hasNextPage) && (
                <div ref={ref}>
                    <CardPlaceholder />

                </div>
            )}
        </>
    )
}

export default UserInfo