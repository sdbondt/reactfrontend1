import React, { useCallback, useEffect } from "react"
import PostForm from "../components/posts/PostForm"
import { useDispatch, useSelector } from "react-redux"
import PostsList from "../components/posts/PostsList"
import { logout } from "../slices/authSlice"
import PostsFilter from "../components/posts/PostsFilter"
import { getPosts, getPostsState } from "../slices/postsSlice"

const Posts = () => {
  const { searchParams } = useSelector(getPostsState)
  const dispatch = useDispatch()

  const handleLogout = () => dispatch(logout())
  const fetchPosts = useCallback(() => {
    dispatch(getPosts())
  }, [dispatch])

  useEffect(() => {
    fetchPosts()
    document.title = 'Posts'
  }, [fetchPosts, searchParams])
  return (
    <div>
      <button type="submit" onClick={handleLogout}>
        Logout
      </button>
      <PostForm />
      <PostsFilter />
      <PostsList />
    </div>
  )
}

export default Posts
