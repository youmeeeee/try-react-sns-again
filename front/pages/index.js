import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AppLayout from '../components/AppLayout'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { LOAD_POSTS_REQUEST } from '../reducers/post'
import { LOAD_MY_INFO_REQUEST } from '../reducers/user'

const Home = () => {
  const { me } = useSelector((state) => state.user)
  const { mainPosts, hasMorePost, loadPostsLoading } = useSelector((state) => state.post)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    })
    dispatch({
      type: LOAD_POSTS_REQUEST,
    })
  }, [])

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 700) {
        if (hasMorePost && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          })
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [hasMorePost, loadPostsLoading])
  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => <PostCard post={post} key={post.id} />)}
    </AppLayout>
  )
}

export default Home
