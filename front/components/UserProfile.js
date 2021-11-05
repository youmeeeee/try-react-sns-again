import React, { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { logoutRequestAction } from '../reducers/user'

export const UserProfile = () => {
    const dispatch = useDispatch(); 
    const { me, logoutLoading } = useSelector((state) => state.user)

    const onLogout = useCallback(
        () => {
            dispatch(logoutRequestAction())
        },
        [],
    )

    return (
       <Card
            actions={[
                <div key="twit">Twit<br/>{me.Posts.length}</div>,
                <div key="following">Followings<br/>{me.Followings.length}</div>,
                <div key="followers">Follwers<br/>{me.Followers.length}</div>
            ]}
        >
           <Card.Meta
                avatar={<Avatar>{me.nickname[0].toUpperCase()}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onLogout} loading={logoutLoading}>LOGOUT</Button>
       </Card>
    )
}

export default UserProfile