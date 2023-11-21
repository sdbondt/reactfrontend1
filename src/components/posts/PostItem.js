import React from "react"
import { useHistory } from "react-router-dom"

const PostItem = ({ post }) => {
  const history = useHistory()
  const goToPost = () => history.push(`/posts/${post.id}`)
  return (
    <div onClick={goToPost}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>by {post.user.name}</p>
    </div>
  )
}

export default PostItem
