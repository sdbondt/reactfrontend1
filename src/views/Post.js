import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPost, getPostsState } from "../slices/postsSlice"
import { useParams } from "react-router-dom"
import PostAuthorOptions from "../components/posts/PostAuthorOptions"
import useUserID from "../hooks/useUserID.js"
import CommentsList from "../components/comments/CommentsList"
import CommentForm from "../components/comments/CommentForm"

const Post = () => {
  const { post, error, loading } = useSelector(getPostsState)
  const dispatch = useDispatch()
  const { postID } = useParams()
  const userID = useUserID()
  console.log(post)
  const fetchPost = useCallback(() => {
    dispatch(getPost(postID))
  }, [dispatch, postID])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  useEffect(() => {
    document.title = post.user ? `Post by ${post?.user?.name}`: 'Post'
  }, [post])

  if (error) return <p>{error}</p>
  if (loading) return <p>loading</p>
  if (!post) return <p>No post found</p>
  
  return (
    <div>
      <div>
        <p>
          {post.title} by {post.user?.name}
        </p>
        <p>{post.content}</p>
      </div>
      {userID === post.user?._id && <PostAuthorOptions />}
      <CommentForm />
      <CommentsList />
    </div>
  )
}

export default Post
