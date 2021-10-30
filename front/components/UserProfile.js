import React, { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../reducers/user'

export const UserProfile = () => {
    const dispatch = useDispatch(); 

    const onLogout = useCallback(
        () => {
            dispatch(logoutAction())
        },
        [],
    )

    return (
       <Card
            actions={[
                <div key="twit">Twit<br/>0</div>,
                <div key="following">Followings<br/>0</div>,
                <div key="followers">Follwers<br/>0</div>
            ]}
        >
           <Card.Meta
                avatar={<Avatar>YM</Avatar>}
                title="Youme"
            />
            <Button onClick={onLogout}>LOGOUT</Button>
       </Card>
    )
}

export default UserProfile