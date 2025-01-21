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
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);



    return (
        <>
            <div className='user-box'>
                {userInfo?.pages?.map((page) =>
                    page.results.map((user, index) => renderUserDetails(user, index))
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

const renderUserDetails = (user: any, index: number) => {
    const { location, picture, name, id, gender, phone, email } = user;
    const { country, city, street } = location;
    const address = `${street.number}, ${street.name}`;
    const locationString = `${address}, ${city}, ${country}`;
    return (
        <div className="user-details" key={`user-info-${user.id.value || index}`}>
            <div className="left-side">
                <Avatar src={picture.thumbnail} size="tiny" />
                <span>
                    <p className="user-name">{`${name.first} ${name.last}`}</p>
                    <p className="user-gender">{`${id.name} / ${gender}`}</p>
                </span>
            </div>
            <div className="center-part">
                <p className="user-address">{phone}</p>
                <p className="user-email">{email}</p>
                <p className="user-address">{locationString}</p>
            </div>
        </div>
    );
};