import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { END } from 'redux-saga'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import wrapper from '../../store/configureStore'
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user'
import { LOAD_POST_REQUEST } from '../../reducers/post'
import AppLayout from '../../components/AppLayout'
import PostCard from '../../components/PostCard'

const Post = () => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const { id } = router.query
  const { singlePost } = useSelector((state) => state.post)
  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname} Post
        </title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname} Post`} />
        <meta property="og:description" content={singlePost.content} />
        <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://reactsns.com/favicon.png'} />
        <meta property="og:url" content={`https://reactsns.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  )
}

// html로 미리 만들어둘만한 것만 제한을 할 떄 사용하면 좋다.
// 쓰기 까다롭고 제한적이다.
export async function getStaticPaths() {
  // const result = await axios.get('/post/list')
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    fallback: true, // false => params에 작성하지 않은 것들은 에러, true => params에 작성하지 않은 것은 CSR
  }
}

export const getStaticPath = wrapper.getStaticPath((store) => async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : ''
  axios.defaults.headers.Cookie = ''
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  })
  store.dispatch({
    type: LOAD_POST_REQUEST,
    data: params.id,
  })
  store.dispatch(END)
  await store.sagaTask.toPromise()
})

export default Post
