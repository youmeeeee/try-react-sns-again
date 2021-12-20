import React from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import { END } from 'redux-saga'

import { Avatar, Card } from 'antd'
import AppLayout from '../components/AppLayout'
import wrapper from '../store/configureStore'
import { LOAD_USER_REQUEST } from '../reducers/user'

const About = () => {
  const { userInfo } = useSelector((state) => state.user)
  return (
    <AppLayout>
      <Head>
        <title>React SNS</title>
      </Head>
      {userInfo
        ? (
          <Card actions={[
            <div key="twit">Twit<br />{userInfo.Posts}</div>,
            <div key="following">Following<br />{userInfo.Followings}</div>,
            <div key="follower">Followers<br />{userInfo.Followers}</div>,
          ]}
          >
            <Card.Meta
              avata={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
              description="react sns user"
            />
          </Card>
        ) : null }
    </AppLayout>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch({
    type: LOAD_USER_REQUEST,
    data: 1,
  })
  store.dispatch(END)
  await store.sagaTask.toPromise()
})

export default About
