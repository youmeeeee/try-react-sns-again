import React, { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'

export const UserProfile = ({ setIsLoggedIn }) => {
    const onLogout = useCallback(
        () => {
            setIsLoggedIn(false)
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

UserProfile.prototype = {
    // setIsLoggedIn: prototype
}

export default UserProfile