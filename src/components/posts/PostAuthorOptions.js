import React, { useReducer, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deletePost, getPostsState, updatePost } from "../../slices/postsSlice"
import { useHistory } from "react-router-dom"

const reducer = (state, action) => ({
  ...state,
  ...action,
})

const PostAuthorOptions = () => {
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const { post } = useSelector(getPostsState)
  const [updateData, dispatchUpdateData] = useReducer(reducer, {
    title: post.title,
    content: post.content,
  })
  const dispatch = useDispatch()
  const history = useHistory()

  const handleDelete = async () => {
    await dispatch(deletePost(post._id))
    if (deletePost.fulfilled) history.push("/posts")
  }
  const toggleUpdateDisplay = () => setShowUpdateForm((show) => !show)
  const handleChange = (e) => dispatchUpdateData({ [e.target.name]: e.target.value })
  const handleUpdate = async () => {
      dispatch(updatePost({
          postID: post._id,
          updateData
    }))
  }
  return (
    <div>
      <button type="submit" onClick={handleDelete}>
        Delete Post
      </button>
      <button type="button" onClick={toggleUpdateDisplay}>
        Edit Post
      </button>
      {showUpdateForm && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="title"
            value={updateData.title}
            placeholder="Update title"
            onChange={handleChange}
          />
          <textarea
            value={updateData.content}
            name="content"
            placeholder="Update content"
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  )
}

export default PostAuthorOptions
