import React, { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { logoutRequestAction } from '../reducers/user'

const UserProfile = () => {
  const dispatch = useDispatch()
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
        <div key="twit"><Link href={`user/${me.id}`}><a>Twit<br />{me.Posts.length}</a></Link></div>,
        <div key="following"><Link href="/profile"><a>Followings<br />{me.Followings.length}</a></Link></div>,
        <div key="followers"><Link href=""><a>Follwers<br />{me.Followers.length}</a></Link></div>,
      ]}
    >
      <Card.Meta
        avatar={(
          <Link href={`/user/${me.id}`}>
            <a><Avatar>{me.nickname[0].toUpperCase()}</Avatar></a>
          </Link>
        )}
        title={me.nickname}
      />
      <Button onClick={onLogout} loading={logoutLoading}>LOGOUT</Button>
    </Card>
  )
}

export default UserProfile
