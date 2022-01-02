import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import Router from 'next/router'
import { END } from 'redux-saga'
import axios from 'axios'
import useSWR from 'swr'

import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'
import { LOAD_MY_INFO_REQUEST } from '../reducers/user'
import wrapper from '../store/configureStore'

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data)

const Profile = () => {
  const { me } = useSelector((state) => state.user)

  const [followersLimit, setFollowersLimit] = useState(3)
  const [followingsLimit, setFollowingsLimit] = useState(3)
  const { data: followersData, error: followerError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher)
  const { data: followingsData, error: followingError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher)

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/')
    }
  }, [me && me.id])

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3)
  }, [])

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3)
  }, [])

  if (!me) return 'My info loading...!'

  if (followerError || followingError) {
    console.error(followerError || followingError)
    return 'followings/followers loading error!'
  }

  return (
    <>
      <Head>
        <title>Profile | SNS</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="Followings" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingError} />
        <FollowList header="Followers" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError} />
      </AppLayout>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : ''
  axios.defaults.headers.Cookie = ''
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  })
  store.dispatch(END)
  await store.sagaTask.toPromise()
})

export default Profile
