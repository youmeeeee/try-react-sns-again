import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import Router from 'next/router'
import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'

const Profile = () => {
  const { me } = useSelector((state) => state.user)

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/')
    }
  }, [me && me.id])
  if (!me) return null

  return (
    <>
      <Head>
        <title>Profile | SNS</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="Following" data={me.Following} />
        <FollowList header="Follower" data={me.Followers} />
      </AppLayout>
    </>
  )
}

export default Profile
