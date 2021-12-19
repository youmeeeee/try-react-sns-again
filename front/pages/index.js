import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { END } from 'redux-saga'
import axios from 'axios'
import AppLayout from '../components/AppLayout'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { LOAD_POSTS_REQUEST } from '../reducers/post'
import { LOAD_MY_INFO_REQUEST } from '../reducers/user'
import wrapper from '../store/configureStore'

const Home = () => {
  const { me } = useSelector((state) => state.user)
  const {
    mainPosts,
    hasMorePost,
    loadPostsLoading,
    retweetError,
  } = useSelector((state) => state.post)

  useEffect(() => {
    if (retweetError) {
      alert(retweetError)
    }
  }, [retweetError])

  const dispatch = useDispatch()

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 700) {
        if (hasMorePost && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          })
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [hasMorePost, loadPostsLoading, mainPosts])
  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => <PostCard post={post} key={post.id} />)}
    </AppLayout>
  )
}

// 화면을 그리기전에 server에서 실행
// Home 보다 먼저 실행
// redux에 데이터가 채워진 상태로 처음부터  존재하게 됨
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : ''
  axios.defaults.headers.Cookie = ''
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  })
  store.dispatch({
    type: LOAD_POSTS_REQUEST,
  })
  store.dispatch(END)
  await store.sagaTask.toPromise()
})

export default Home
