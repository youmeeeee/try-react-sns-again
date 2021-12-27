import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Card } from 'antd'
import { END } from 'redux-saga'
import Head from 'next/head'
import { useRouter } from 'next/router'

import axios from 'axios'
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post'
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../reducers/user'
import PostCard from '../../components/PostCard'
import wrapper from '../../store/configureStore'
import AppLayout from '../../components/AppLayout'

const User = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  const { mainPosts, hasMorePosts, loadUserPostsLoading } = useSelector((state) => state.post)
  const { userInfo } = useSelector((state) => state.user)

  useEffect(() => {
    const onScroll = () => {
      // eslint-disable-next-line max-len
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadUserPostsLoading) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
            data: id,
          })
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [mainPosts.length, hasMorePosts, id])

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>
            {userInfo.nickname} Post
          </title>
          <meta name="description" content={`${userInfo.nickname} Posts`} />
          <meta property="og:title" content={`${userInfo.nickname} Posts`} />
          <meta property="og:description" content={`${userInfo.nickname} Posts`} />
          <meta property="og:image" content="https://nodebird.com/favicon.ico" />
          <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
        </Head>
      )}
      {userInfo
        ? (
          <Card
            actions={[
              <div key="twit">
                Twit
                <br />
                {userInfo.Posts}
              </div>,
              <div key="following">
                Following
                <br />
                {userInfo.Followings}
              </div>,
              <div key="follower">
                Follower
                <br />
                {userInfo.Followers}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
            />
          </Card>
        )
        : null}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : ''
  axios.defaults.headers.Cookie = ''
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie
  }
  store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: params.id,
  })
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  })
  store.dispatch({
    type: LOAD_USER_REQUEST,
    data: params.id,
  })
  store.dispatch(END)
  await store.sagaTask.toPromise()
})

export default User
