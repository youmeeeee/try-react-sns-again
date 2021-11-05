import React from 'react'
import { useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user)
  const { mainPosts } = useSelector((state) => state.post)
  return (
    <AppLayout>
      {isLoggedIn && <PostForm /> }
      {mainPosts.map((post) => <PostCard post={post} key={post.id} />)}
    </AppLayout>
  )
}

export default Home
