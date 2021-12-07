import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import Router from 'next/router'
import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'
import { LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWERS_REQUEST } from '../reducers/user'

const Profile = () => {
  const { me } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    })
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    })
  }, [])

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
        <FollowList header="Followings" data={me.Followings} />
        <FollowList header="Followers" data={me.Followers} />
      </AppLayout>
    </>
  )
}

export default Profile
